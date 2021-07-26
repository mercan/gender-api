const config = require("../../config/index");
const nameController = require("../controllers/name.controller");

const routes = [
  {
    method: "GET",
    url: "/search/",
    config: {
      rateLimit: {
        max: config.rateLimit.name.max,
        timeWindow: config.rateLimit.name.timeWindow,
        allowList: function (req) {
          return req.headers["x-api-key"] !== undefined;
        },
      },
    },
    handler: nameController.getName,
  },
];

module.exports = routes;
