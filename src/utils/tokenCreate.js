const config = require("../config/index");
const jwt = require("jsonwebtoken");

module.exports = ({ _id: id, full_name, email }) =>
  jwt.sign(
    {
      id,
      full_name,
      email,
    },
    config.jwtSecretKey,
    {
      algorithm: config.jwtAlgorithm,
      expiresIn: config.jwtExpiresIn,
    }
  );
