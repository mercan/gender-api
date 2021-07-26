const config = require("../config/index");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    full_name: {
      type: String,
      required: true,
      maxlength: 100,
      minlength: 3,
    },

    email: {
      type: String,
      unique: true,
      required: true,
      maxlength: 100,
      minlength: 10,
    },

    password: {
      type: String,
      required: true,
      maxlength: 100,
      minlength: 6,
    },

    apiKey: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

// Static Methods
User.statics.findByApiKey = async function (apiKey) {
  const hash = crypto
    .createHash("sha512")
    .update(`${apiKey}:${config.apiSecretKey}`)
    .digest("hex");

  return await this.findOne({ apiKey: hash });
};

// Istance methods
User.methods.comparePassword = function (plainPassword) {
  return bcrypt.compareSync(plainPassword, this.password);
};

User.methods.createApiKey = async function () {
  const apiKey = crypto.randomBytes(26).toString("hex");
  const userRecord = await userModel.findOne({ apiKey }, "_id");

  if (userRecord) {
    return this.createApiKey();
  }

  const hash = crypto
    .createHash("sha512")
    .update(`${apiKey}:${config.apiSecretKey}`)
    .digest("hex");
  this.apiKey = hash;
  await this.save();

  return apiKey;
};

User.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

User.index({ email: 1 });

const userModel = mongoose.model("user", User);
module.exports = userModel;
