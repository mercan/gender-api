const config = require("../config/index");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (!bearerHeader) {
    return res.code(403).send({
      statusCode: 403,
      message: "No token provided!",
    });
  }

  const bearer = bearerHeader.split(" ");
  const bearerToken = bearer[1];
  req.token = bearerToken;

  try {
    const decode = jwt.verify(bearerToken, config.jwtSecret);
    req.user = decode;
  } catch (err) {
    return res.code(401).send({
      statusCode: 401,
      message: "Unauthorized!",
    });
  }

  next();
};
