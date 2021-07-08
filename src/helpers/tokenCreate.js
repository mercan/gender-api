const config = require("../config/index");
const jwt = require("jsonwebtoken");

module.exports = ({ _id, full_name, email }) =>
  jwt.sign(
    {
      _id,
      full_name,
      email,
    },
    config.jwtSecret,
    {
      algorithm: config.jwtAlgorithm,
      expiresIn: config.jwtExpiresIn,
    }
  );
