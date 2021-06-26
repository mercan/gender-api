const csv = require("csv-parser");
const fs = require("fs");

// Names
const glb_males = require("../data/males.json");
const glb_females = require("../data/females.json");

// TR Name
const tr_males = require("../data/tr_male.json");
const tr_females = require("../data/tr_female.json");

// US Name
const us_males = require("../data/us_male.json");
const us_females = require("../data/us_female.json");

const male_names = [...tr_males, ...us_males].sort((a, b) => b.count - a.count);
const female_names = [...tr_females, ...us_females].sort((a, b) => b.count - a.count);

fs.writeFile(`${__dirname}/../data/males.json`, JSON.stringify(male_names, null, 2), (err) => {
  if (err) throw err;
  console.log("Created <males.json>");
});

fs.writeFile(`${__dirname}/../data/females.json`, JSON.stringify(female_names, null, 2), (err) => {
  if (err) throw err;
  console.log("Created <females.json>");
});
