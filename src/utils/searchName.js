const males = require("../data/males.json");
const females = require("../data/females.json");

module.exports = (name) => {
  const originalName = name;
  name = name.toLocaleLowerCase();
  console.log(originalName, name, name.toLocaleLowerCase(), name.toLowerCase());
  name = name.replace(/i/g, "[İi]").replace(/ı/g, "[Iı]");

  const regex = new RegExp(`^${name}$`, "gi");
  const nameSearch = ({ name }) => name.match(regex);

  let male = males.filter(nameSearch).sort((a, b) => b.count - a.count);
  let female = females.filter(nameSearch).sort((a, b) => b.count - a.count);

  if (!male.length) {
    male = { name, count: 0, country: null };
  }

  if (!female.length) {
    female = { name, count: 0, country: null };
  }

  if (Array.isArray(male) && Array.isArray(female) && male[0].count > female[0].count) {
    male = male[0];
    for (let i = 0; i < female.length; i++) {
      if (male.country === female[i].country) {
        female = female[i];
      }
    }
  } else if (Array.isArray(male) && Array.isArray(female) && female[0].count > male[0].count) {
    female = female[0];
    for (let i = 0; i < male.length; i++) {
      if (female.country === male[i].country) {
        male = male[i];
      }
    }
  }

  if (!Array.isArray(male) && !male.count) {
    female = female.length ? female[0] : female;
  } else if (!Array.isArray(female) && !female.count) {
    male = male.length ? male[0] : male;
  }

  if (!Array.isArray(male) && !Array.isArray(female) && !male.count && !female.count) {
    return {
      name: originalName,
      q: originalName,
      gender: "null",
      country: "null",
      total_names: 0,
      probability: 0,
    };
  } else if (male.count > female.count) {
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
