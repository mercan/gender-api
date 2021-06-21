const { Sequelize, QueryTypes } = require("sequelize");
const fs = require("fs");

const originalMales = require("../data/male.json");
const originalFemales = require("../data/female.json");

String.prototype.turkishToEnglish = function () {
  return this.replace(/Ğ/gim, "G")
    .replace(/Ü/gim, "U")
    .replace(/Ş/gim, "S")
    .replace(/I/gim, "I")
    .replace(/İ/gim, "I")
    .replace(/Ö/gim, "O")
    .replace(/Ç/gim, "C")
    .replace(/ğ/gim, "ğ")
    .replace(/ü/gim, "u")
    .replace(/ş/gim, "s")
    .replace(/ı/gim, "ı")
    .replace(/i/gim, "ı")
    .replace(/ö/gim, "o")
    .replace(/ç/gim, "c")
    .toLocaleUpperCase();
};

const nameTotalSearchMale = () => {
  const promises = searchMaleNames.map(async (obj) => {
    const [key, originalName] = Object.entries(obj).flat();

    const [{ count }] = await sequelize.query(
      "SELECT COUNT(first) FROM citizen WHERE first = :name and gender = 'E'",
      {
        replacements: { name: key },
        type: QueryTypes.SELECT,
      }
    );

    return { name: originalName, count };
  });

  Promise.all(promises).then((results) => {
    fs.writeFile("./original_data/maleAndCount.json", JSON.stringify(results, null, 2), (err) => {
      if (err) throw err;

      console.log("Created <maleAndCount.json>");
    });
  });
};

const nameTotalSearchFemale = () => {
  const promises = searchFemaleNames.map(async (obj) => {
    const [key, originalName] = Object.entries(obj).flat();

    const [{ count }] = await sequelize.query(
      "SELECT COUNT(first) FROM citizen WHERE first = :name and gender = 'K'",
      {
        replacements: { name: key },
        type: QueryTypes.SELECT,
      }
    );

    return { name: originalName, count };
  });

  Promise.all(promises).then((results) => {
    fs.writeFile("./original_data/femaleAndCount.json", JSON.stringify(results, null, 2), (err) => {
      if (err) throw err;

      console.log("Created <femaleAndCount.json>");
    });
  });
};

/*
const original_male_names_1 = {};
const original_male_names = originalMales.reduce((acc, { name }) => {
  if (acc[name.turkishToEnglish()]) {
    original_male_names_1[name.turkishToEnglish()] = name;
  } else {
    acc[name.turkishToEnglish()] = name;
  }

  return acc;
}, {});
*/

/*
const original_female_names_1 = {};
const original_female_names = originalFemales.reduce((acc, { name }) => {
  if (acc[name.turkishToEnglish()]) {
    original_female_names_1[name.turkishToEnglish()] = name;
  } else {
    acc[name.turkishToEnglish()] = name;
  }

  return acc;
}, {});

const databaseConfig = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "root",
  DB: "deneme",
  dialect: "postgres",
  pool: {
    max: 50,
    min: 0,
    acquire: 1200000,
    idle: 1000000,
  },
};

const sequelize = new Sequelize(databaseConfig.DB, databaseConfig.USER, databaseConfig.PASSWORD, {
  host: databaseConfig.HOST,
  dialect: databaseConfig.dialect,

  pool: {
    max: databaseConfig.pool.max,
    min: databaseConfig.pool.min,
    acquire: databaseConfig.pool.acquire,
    idle: databaseConfig.pool.idle,
  },
});

const db = { Sequelize, sequelize, Op: Sequelize.Op };
let searchMaleNames = [];
let searchFemaleNames = [];
*/

/*
sequelize
  .query("select DISTINCT first from citizen where gender = 'E' order by first asc OFFSET 222", {
    type: QueryTypes.SELECT,
  })
  .then((names) => {
    names.forEach(({ first: name }) => {
      if (name.includes(" ")) {
        const firstName = name.split(" ")[0];
        const secondName = name.split(" ")[1];

        if (!searchMaleNames.includes(firstName)) {
          searchMaleNames.push(firstName);
        } else if (!searchMaleNames.includes(secondName)) {
          searchMaleNames.push(secondName);
        }
      } else if (!searchMaleNames.includes(name)) {
        searchMaleNames.push(name);
      }
    });

    searchMaleNames = searchMaleNames.reduce((acc, name) => {
      if (original_male_names_1[name]) {
        acc.push({ [name]: original_male_names_1[name] });
      }

      if (original_male_names[name]) {
        acc.push({ [name]: original_male_names[name] });
      }

      return acc;
    }, []);

    nameTotalSearchMale();
  });
*/

/*
sequelize
  .query("select DISTINCT first from citizen where gender = 'K' order by first asc OFFSET 95", {
    type: QueryTypes.SELECT,
  })
  .then((names) => {
    names.forEach(({ first: name }) => {
      if (name.includes(" ")) {
        const firstName = name.split(" ")[0];
        const secondName = name.split(" ")[1];

        if (!searchFemaleNames.includes(firstName)) {
          searchFemaleNames.push(firstName);
        } else if (!searchFemaleNames.includes(secondName)) {
          searchFemaleNames.push(secondName);
        }
      } else if (!searchFemaleNames.includes(name)) {
        searchFemaleNames.push(name);
      }
    });

    searchFemaleNames = searchFemaleNames.reduce((acc, name) => {
      if (original_female_names_1[name]) {
        acc.push({ [name]: original_female_names_1[name] });
      }

      if (original_female_names[name]) {
        acc.push({ [name]: original_female_names[name] });
      }

      return acc;
    }, []);

    nameTotalSearchFemale();
  });
*/
