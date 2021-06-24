const csv = require("csv-parser");
const fs = require("fs");

const males = [];
const females = [];
const country = "US";
const dataFolderPath = "/Users/mercan/Desktop/gender-api/src/data";

// Names
const glb_males = require("../data/males.json");
const glb_females = require("../data/females.json");

// TR Name
const tr_males = require("../original_data/tr_male.json");
const tr_females = require("../original_data/tr_female.json");

// US Name
const us_males = require("../data/us_male.json");
const us_females = require("../data/us_female.json");

/*
fs.createReadStream(`${dataFolderPath}/names_gender.csv`)
  .pipe(csv())
  .on("data", ({ Name: name, Gender: gender, Count: count }) => {
    gender = gender === "M" ? "Male" : "Female";

    if (gender === "Male") {
      males.push({ name, count: Number(count), country });
    } else if (gender === "Female") {
      females.push({ name, count: Number(count), country });
    }
  })
  .on("end", () => {
    fs.writeFile(`${dataFolderPath}/us_male.json`, JSON.stringify(males, null, 2), (err) => {
      if (err) throw err;
      console.log("The file was saved! {us_male.json}");
    });

    fs.writeFile(`${dataFolderPath}/us_female.json`, JSON.stringify(females, null, 2), (err) => {
      if (err) throw err;
      console.log("The file was saved! {us_female.json}");
    });
  });
*/

/*
males.push(
  ...tr_males.reduce((acc, { name, count }) => {
    acc.push({ name, count: Number(count), country: "TR" });
    return acc;
  }, [])
);

females.push(
  ...tr_females.reduce((acc, { name, count }) => {
    acc.push({ name, count: Number(count), country: "TR" });
    return acc;
  }, [])
);
*/

/*
fs.writeFile(`${dataFolderPath}/tr_male.json`, JSON.stringify(males, null, 2), (err) => {
  if (err) throw err;
  console.log("The file was saved! {tr_male.json}");
});

fs.writeFile(`${dataFolderPath}/tr_female.json`, JSON.stringify(females, null, 2), (err) => {
  if (err) throw err;
  console.log("The file was saved! {tr_female.json}");
});
*/

/*
// Global Name
males.push(...tr_males, ...us_males);
females.push(...tr_females, ...us_females);

fs.writeFile(`${dataFolderPath}/males.json`, JSON.stringify(males, null, 2), (err) => {
  if (err) throw err;
  console.log("The file was saved! {males.json}");
});

fs.writeFile(`${dataFolderPath}/females.json`, JSON.stringify(females, null, 2), (err) => {
  if (err) throw err;
  console.log("The file was saved! {females.json}");
});
*/

/*
console.log("Tekil");
console.log(glb_males.reduce((acc, _) => (acc += 1), 0));
console.log(glb_females.reduce((acc, _) => (acc += 1), 0));
console.log("\n");
console.log("Toplam");
console.log(glb_males.reduce((acc, { count }) => (acc += count), 0));
console.log(glb_females.reduce((acc, { count }) => (acc += count), 0));
*/
