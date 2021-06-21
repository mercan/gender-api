const males = require("../data/male.json");
const females = require("../data/female.json");

module.exports = (name) => {
  const nameInput = name.charAt(0).toLocaleUpperCase() + name.substring(1);
  const nameSearch = ({ name }) => name === nameInput;

  const male = males.find(nameSearch) || { name: nameInput, count: 0 };
  const female = females.find(nameSearch) || { name: nameInput, count: 0 };
  male.count = Number(male.count);
  female.count = Number(female.count);

  if (!males.find(nameSearch) && !females.find(nameSearch)) {
    return {
      name: nameInput,
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
      name: nameInput,
      gender: "Male",
      country: "TR",
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
      name: nameInput,
      gender: "Female",
      country: "TR",
      total_names: totalName,
      probability: probability === "1" ? 100 : Number(probability),
    };
  }
};
