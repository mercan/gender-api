// Get Data Models
const Name = require("../models/Name");
const nameSplit = require("../utils/nameSplit");

const searchName = async (name) => {
  if (name.length === 0) {
    return false;
  }

  if (name[0] === '"') {
    name = name.slice(1);
  }

  if (name[0] === "'") {
    name = name.slice(1);
  }

  if (name[0] === "<") {
    name = name.slice(1);
  }

  if (name[0] === ">") {
    name = name.slice(1);
  }

  const originalName = name;
  name = nameSplit(name).toLocaleLowerCase("tr");
  name = name.replace(/i/g, "[İi]").replace(/ı/g, "[Iı]");

  const regex = new RegExp(`^${name}$`, "gi");

  let male, female;
  const result = await Name.find({ name: { $regex: regex } }, { _id: false }).sort({ count: -1 });
  const filterCountry = result
    .slice(1)
    .filter(({ gender, country }) => result[0].country === country && result[0].gender !== gender);

  if (result.length) {
    if (result[0].gender === "Male") {
      male = result[0];
      female = filterCountry[0];
    } else {
      female = result[0];
      male = filterCountry[0];
    }
  } else {
    return {
      name: originalName,
      q: originalName,
      gender: null,
      country: null,
      total_names: 0,
      probability: 0,
    };
  }

  if (!male) {
    male = { name, count: 0, country: null };
  }

  if (!female) {
    female = { name, count: 0, country: null };
  }

  if (male.count > female.count) {
    const totalName = male.count + female.count;

    let probability = String(male.count / totalName);
    probability = probability.substring(probability.indexOf(".") + 1);
    probability =
      probability[0] === "0" ? probability.substring(1, 3) : probability.substring(0, 2);

    return {
      name: male.name,
      q: originalName,
      gender: "Male",
      country: male.country,
      total_names: totalName,
      probability: probability === "1" ? 100 : Number(probability),
    };
  } else if (female.count > male.count) {
    const totalName = male.count + female.count;

    let probability = String(female.count / totalName);
    probability = probability.substring(probability.indexOf(".") + 1);
    probability =
      probability[0] === "0" ? probability.substring(1, 3) : probability.substring(0, 2);

    return {
      name: female.name,
      q: originalName,
      gender: "Female",
      country: female.country,
      total_names: totalName,
      probability: probability === "1" ? 100 : Number(probability),
    };
  }
};

// Get Name
const getName = async (req, res) => {
  if (req.query.name && req.query.name.indexOf(",") !== -1) {
    const names = [...new Set(req.query.name.split(","))];

    if (names.length > 100) {
      names.length = 100;
    }

    const data = await Promise.all(names.map((name) => searchName(name)));
    const namesData = await Promise.all(
      data.map(async (obj) => {
        const data = { ...obj, duration: `${res.getResponseTime().toFixed()}ms` };

        if (data.name.split(" ").length > 1 && data.probability) {
          const names = data.name.split(" ");
          const namesData = await Promise.all(names.map((name) => searchName(name)));
          data["names"] = namesData.map((obj) => (delete obj["q"], obj));
        }

        return data;
      })
    );

    return res.code(200).send(namesData);
  }

  const nameData = await searchName(req.query.name);
  req.query.name = nameData.name;
  const data = { ...nameData, duration: `${res.getResponseTime().toFixed()}ms` };
  const newData = [];
  if (req.query.name.split(" ").length > 1 && data.probability) {
    const namesData = await Promise.all(data.name.split(" ").map((name) => searchName(name)));
    data["names"] = namesData.map((obj) => (delete obj["q"], obj));
  }
  return res.code(200).send(data);
};

module.exports = { getName };
