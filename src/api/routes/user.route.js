const config = require("../../config/index");
const userController = require("../controllers/user.controller");
const tokenVerifier = require("../../middleware/tokenVerifier");

const routes = [
  {
    method: "POST",
    url: "/user/create_api_key/",
    config: {
      rateLimit: {
        max: config.rateLimit.user.createApiKey.max,
        timeWindow: config.rateLimit.user.createApiKey.timeWindow,
      },
    },
    preValidation: tokenVerifier,
    handler: userController.createApiKey,
  },
];

module.exports = routes;
