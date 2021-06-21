const fs = require("fs");
const males = require("../data/male.json");
const females = require("../data/female.json");
const unisex = [];

const maleAndFemaleNameDiff = [];
const uniqueMaleNames = [];
const uniqueFemaleNames = [];

/*
males.forEach(({ name }) => females.find((obj) => (obj.name === name ? unisex.push(obj) : false)));
unisex.forEach(({ name }) => {
  const male = males.find((obj) => obj.name === name);
  const female = females.find((obj) => obj.name === name);
  maleAndFemaleNameDiff.push([
    male,
    female,
    {
      diff: male.count - female.count,
      gender: Number(male.count) > Number(female.count) ? "male" : "female",
    },
  ]);
});

maleAndFemaleNameDiff.map((obj) => {
  if (obj[2].diff >= 3000 || obj[2].diff <= -3000) {
    console.log(obj);
  }
});
*/

/*
males.forEach(({ name }) => {
  const searchName = females.find((obj) => obj.name === name);
  if (!searchName) uniqueMaleNames.push(name);
});

females.forEach(({ name }) => {
  const searchName = males.find((obj) => obj.name === name);
  if (!searchName) uniqueFemaleNames.push(name);
});

//console.log(uniqueMaleNames, uniqueFemaleNames);

fs.writeFile("./original_data/uniqueMale.json", JSON.stringify(uniqueMaleNames, null, 2), (err) => {
  if (err) throw err;
  console.log("Created <uniqueMale.json>");
});

fs.writeFile(
  "./original_data/uniqueFemale.json",
  JSON.stringify(uniqueFemaleNames, null, 2),
  (err) => {
    if (err) throw err;
    console.log("Created <uniqueFemale.json>");
  }
);
*/

/*
const new_males = males.sort((a, b) => b.count - a.count);
console.log(new_males);
const new_females = females.sort((a, b) => b.count - a.count);
console.log(new_females);
*/

/*
fs.writeFile("./original_data/male.json", JSON.stringify(new_males, null, 2), (err) => {
  if (err) throw err;
  console.log("Created <male.json>");
});

fs.writeFile("./original_data/female.json", JSON.stringify(new_females, null, 2), (err) => {
  if (err) throw err;
  console.log("Created <female.json>");
});
*/

/*
const overUsedMaleNames = males.filter(({ count }) => count >= 40000);
const overUsedFemaleNames = females.filter(({ count }) => count >= 40000);

console.log(overUsedMaleNames, overUsedFemaleNames);
*/
