const nameController = require("../controllers/name.controller");

const routes = [
  {
    method: "GET",
    url: "/search/",
    config: {
      rateLimit: {
        max: 200,
        timeWindow: 1000 * 60 * 60 * 1,
      },
    },
    handler: nameController.getName,
  },
];

module.exports = routes;
