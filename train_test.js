const fs = require("fs");
const synaptic = require("synaptic");
const _ = require("lodash");
const { INPUT_LENGTH, convertNameToInput } = require("./util");
const { Trainer, Architect } = synaptic;

/*
const males = ["İbrahim", "Anıl", "Can", "Furkan", "Deniz"];
const females = ["Fatma", "Gizem", "Zeynep", "Betül", "Saniye"];
*/
const males = [...Array(99).fill("Aydın")];
const females = [...Array(100).fill("Aydın")];
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
    iterations: 400000,
    shuffle: true,
    error: 0.000000000000001,
    log: 10000,
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
  console.log(`Name: Aydın/aydın - ${getGender("Aydın")}`);

  /*
  console.log(`Name: İbrahim/ibrahim - ${getGender("İbrahim")}`);
  console.log(`Name: Anıl/anıl - ${getGender("Anıl")}`);
  console.log(`Name: Can/can - ${getGender("Can")}`);
  console.log(`Name: Furkan/furkan - ${getGender("Furkan")}`);
  console.log(`Name: Deniz/deniz - ${getGender("Deniz")}`);
  console.log("\n\n");
  console.log(`Name: Fatma/fatma - ${getGender("Fatma")}`);
  console.log(`Name: Gizem/gizem - ${getGender("Gizem")}`);
  console.log(`Name: Zeynep/zeynep - ${getGender("Zeynep")}`);
  console.log(`Name: Betül/betül - ${getGender("Betül")}`);
  console.log(`Name: Saniye/saniye - ${getGender("Saniye")}`);
  */
}

test();

const jsonGenderNeuralNetwork = JSON.stringify(myNetwork.toJSON(), null, 2);
fs.writeFileSync(
  "./neural_network/jsonGenderNeuralNetwork_train_test.json",
  jsonGenderNeuralNetwork
);
