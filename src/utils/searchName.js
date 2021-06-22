const males = require("../data/males.json");
const females = require("../data/females.json");

/**
 * Yapmak istediğim şey aynı isimden birden fazla dilde varsa en çok hangi dilde kullanılıyorsa o isim
 * onu sec ve onun zıt cinsiyet yönündeki kişi secerken de ikisinin de aynı ülkeden olduğuna dikkat et
 * */

module.exports = (name) => {
  const nameInput = name.charAt(0).toLocaleUpperCase() + name.substring(1);
  const nameSearch = ({ name }) => name === nameInput;

  let male = males.filter(nameSearch).sort((a, b) => b.count - a.count);
  let female = females.filter(nameSearch).sort((a, b) => b.count - a.count);

  if (!male.length) {
    male = { name: nameInput, count: 0, country: "null" };
  }

  if (!female.length) {
    female = { name: nameInput, count: 0, country: "null" };
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

  if (male.hasOwnProperty("count") && !male.count) {
    female = female[0];
  } else if (female.hasOwnProperty("count") && !female.count) {
    male = male[0];
  }

  if (!Array.isArray(male) && !Array.isArray(female) && !male.count && !female.count) {
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
      name: nameInput,
      gender: "Female",
      country: female.country,
      total_names: totalName,
      probability: probability === "1" ? 100 : Number(probability),
    };
  }
};
