const csv = require("csv-parser");
const fs = require("fs");
let original_male_names = require("../data/male.json");
let original_female_names = require("../data/female.json");

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
/*
let original_male_names_1 = {};
original_male_names = original_male_names.reduce((acc, { name }) => {
  if (acc[name.turkishToEnglish()]) {
    original_male_names_1[name.turkishToEnglish()] = name;
  } else {
    acc[name.turkishToEnglish()] = name;
  }

  return acc;
}, {});

let original_female_names_1 = {};
original_female_names = original_female_names.reduce((acc, { name }) => {
  if (acc[name.turkishToEnglish()]) {
    original_female_names_1[name.turkishToEnglish()] = name;
  } else {
    acc[name.turkishToEnglish()] = name;
  }

  return acc;
}, {});
*/

let males = [];
let females = [];

const fullTextSearch = (search, text) => {
  return text.split("").every((character) => character === search);
};

/*
fs.createReadStream("males.csv")
  .pipe(csv())
  .on("data", ({ first: data }) => {
    if (data.length <= 2) {
      return;
    } else if (data === "-") {
      return;
    } else if (!isNaN(Number(data))) {
      return;
    } else if (data === "<NULL>") {
      return;
    } else if (fullTextSearch(data[0], data)) {
      return;
    } else if (data[1] === " ") {
      males.push(data.substring(1).replace(/\./, "").trim());
    } else if (data.includes(".") && data[data.indexOf(".") + 1] === " ") {
      males.push(data.substring(data.indexOf(".") + 2));
    } else {
      if (data.includes(" ")) {
        const names = data.split(" ");
        names.forEach((_, index) => males.push(names[index]));
      } else {
        males.push(data);
      }
    }
  })
  .on("end", () => {
    males = males.reduce((acc, name) => {
      if (original_male_names_1[name]) {
        acc.push(original_male_names_1[name]);
      }

      if (original_male_names[name]) {
        acc.push(original_male_names[name]);
      }

      return acc;
    }, []);

    fs.writeFile("./training_data/names/male.json", JSON.stringify(males, null, 2), (err) => {
      if (err) throw err;
      console.log("The file was saved! {males.csv} > {male.json}");
    });
  });
*/

/*
fs.createReadStream("females.csv")
  .pipe(csv())
  .on("data", ({ first: data }) => {
    if (data.length <= 2) {
      return;
    } else if (data === "-") {
      return;
    } else if (!isNaN(Number(data))) {
      return;
    } else if (data === "<NULL>") {
      return;
    } else if (fullTextSearch(data[0], data)) {
      return;
    } else if (data[1] === " ") {
      females.push(data.substring(1).replace(/\./, "").trim());
    } else if (data.includes(".") && data[data.indexOf(".") + 1] === " ") {
      females.push(data.substring(data.indexOf(".") + 2));
    } else {
      if (data.includes(" ")) {
        const names = data.split(" ");
        names.forEach((_, index) => females.push(names[index]));
      } else {
        females.push(data);
      }
    }
  })
  .on("end", () => {
    females = females.reduce((acc, name) => {
      if (original_female_names_1[name]) {
        acc.push(original_female_names_1[name]);
      }

      if (original_female_names[name]) {
        acc.push(original_female_names[name]);
      }

      return acc;
    }, []);

    fs.writeFile("./training_data/names/female.json", JSON.stringify(females, null, 2), (err) => {
      if (err) throw err;
      console.log("The file was saved! {females.csv} > {female.json}");
    });
  });
*/
