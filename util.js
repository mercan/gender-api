const INPUT_LENGTH = 16; // number of characters in name used to derive input for algorithm
const GENDER_NEURAL_NETWORK_KEY = "jsonGenderNeuralNetwork";

String.prototype.turkishtoEnglish = function () {
  return this.replace(/Ğ/gim, "g")
    .replace(/Ü/gim, "ü")
    .replace(/Ş/gim, "ş")
    .replace(/I/gim, "i")
    .replace(/İ/gim, "i")
    .replace(/Ö/gim, "ö")
    .replace(/Ç/gim, "ç")
    .toLocaleLowerCase();
};

function convertNameToInput(name) {
  name = name.toLocaleLowerCase();

  if (name.length > INPUT_LENGTH) {
    name = name.substring(INPUT_LENGTH);
  }

  while (name.length < INPUT_LENGTH) {
    name = " " + name;
  }

  const characters = name.split("");
  return characters.map((c) => (c == " " ? 0 : c.charCodeAt(0) / 500));
}

module.exports = { INPUT_LENGTH, convertNameToInput, GENDER_NEURAL_NETWORK_KEY };
