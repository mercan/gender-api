const { Sequelize, QueryTypes } = require("sequelize");
const fs = require("fs");

/*
const originalMales = require("./original_data/male.json");
const originalFemales = require("./original_data/female.json");

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

const original_male_names_1 = {};
const original_male_names = originalMales.reduce((acc, name) => {
  if (acc[name.turkishToEnglish()]) {
    original_male_names_1[name.turkishToEnglish()] = name;
  } else {
    acc[name.turkishToEnglish()] = name;
  }

  return acc;
}, {});

const original_female_names_1 = {};
const original_female_names = originalFemales.reduce((acc, name) => {
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
        searchMaleNames.push(name.split(" ")[0]);
      } else {
        searchMaleNames.push(name);
      }
    });

    searchMaleNames = [...new Set(searchMaleNames)];

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
        searchFemaleNames.push(name.split(" ")[0]);
      } else {
        searchFemaleNames.push(name);
      }
    });

    searchFemaleNames = [...new Set(searchFemaleNames)];

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
*/
