const mongoose = require("mongoose");

const countriesDigitCodes = require("../data/countriesDigitCodes.json");

const Name = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  gender: { type: String, required: true, enum: ["Male", "Female"] },
  count: { type: Number, required: true },
  country: { type: String, required: true, enum: countriesDigitCodes },

  created_At: { type: Date, default: new Date() },
});

Name.index({ name: "text" });
module.exports = mongoose.model("Name", Name, "names");
