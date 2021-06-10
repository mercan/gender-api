const fs = require("fs");
const synaptic = require("synaptic");
const _ = require("lodash");
const { INPUT_LENGTH, convertNameToInput } = require("./util");
const { Trainer, Architect } = synaptic;

const uniqueMaleNames = require("./original_data/uniqueMale.json");
const uniqueFemaleNames = require("./original_data/uniqueFemale.json");

let males = require("./original_data/male.json");
let females = require("./original_data/female.json");

males = males.flatMap(({ name, count }) => {
  count = Number(count);

  if (uniqueMaleNames.includes(name)) {
    return Array(50).fill(name);
  }

  if (count > 40000) {
    return Array(40000).fill(name);
  }

  return Array(count).fill(name);
});

females = females.flatMap(({ name, count }) => {
  count = Number(count);

  if (uniqueFemaleNames.includes(name)) {
    return Array(50).fill(name);
  }

  if (count >= 40000) {
    return Array(40000).fill(name);
  }

  return Array(count).fill(name);
});

console.log(
  `Males: ${males.length}, Females: ${females.length} - Total: ${males.length + females.length}`
);
const myNetwork = new Architect.Perceptron(INPUT_LENGTH, 6, 2);

let trainingData = [];
const trainer = new Trainer(myNetwork);

for (let i = 0; i < males.length; i++) {
  trainingData.push({
    input: convertNameToInput(males[i]),
    output: [1, 0], // Male = true, Female = false
  });
}

for (let i = 0; i < females.length; i++) {
  trainingData.push({
    input: convertNameToInput(females[i]),
    output: [0, 1], // Male = false, Female = true
  });
}

for (let i = 0; i < 10; i++) {
  trainingData = _.shuffle(trainingData);
}

// Iterasyon
for (let i = 0; i < 1; i++) {
  trainer.train(trainingData, {
    rate: 0.01,
    iterations: 100000,
    shuffle: true,
    error: 0.000000000000001,
    log: 100,
    cost: synaptic.Trainer.cost.MSE,
  });
}

function getGender(name) {
  const result = myNetwork.activate(convertNameToInput(name));

  console.log("\n", result);
  if (result[0] > result[1]) {
    return `${name} Male ${(result[0] * 100).toFixed()}% sure`;
  }
  return `${name} Female ${(result[1] * 100).toFixed()}% sure`;
}

function test() {
  console.log(`Name: Deniz/deniz - ${getGender("Deniz")}`);
  console.log(`Name: İbrahim/ibrahim - ${getGender("İbrahim")}`);
  console.log(`Name: Anıl/anıl - ${getGender("Anıl")}`);
  console.log(`Name: Saniye/saniye - ${getGender("Saniye")}`);
}

test();

const jsonGenderNeuralNetwork = JSON.stringify(myNetwork.toJSON(), null, 2);
fs.writeFileSync("./neural_network/jsonGenderNeuralNetwork.json", jsonGenderNeuralNetwork);
