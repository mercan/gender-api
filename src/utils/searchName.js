// Get Data Models
const Name = require("../models/Name");

const nameSplit = require("./nameSplit");

module.exports = async (name) => {
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

  function capitalize(word) {
    return word[0].toLocaleUpperCase("tr") + word.slice(1).toLocaleLowerCase("tr");
  }

  const originalName = name;
  name = nameSplit(capitalize(name));

  let male, female;
  const result = await Name.find({ name }).sort({ count: -1 });

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
