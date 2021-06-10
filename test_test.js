const { Network } = require("synaptic");
const { convertNameToInput } = require("./util");
const genderNeuralNetworkJSON = require("./neural_network/jsonGenderNeuralNetwork_train_test.json");

function getGenderInfo(name) {
  const genderNeuralNetwork = Network.fromJSON(genderNeuralNetworkJSON);
  const result = genderNeuralNetwork.activate(convertNameToInput(name));

  console.log(result);
  if (result[0] > result[1]) {
    return {
      name,
      male: true,
      certainty: (result[0] * 100).toFixed() + "%",
    };
  }

  return {
    name,
    female: true,
    certainty: (result[1] * 100).toFixed() + "%",
  };
}

console.log(getGenderInfo(process.argv[2]), "\n\n");
