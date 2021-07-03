const nameController = require("../controllers/name.controller");

const routes = [
  {
    method: "GET",
    url: "/search/",
    handler: nameController.getName,
  },
];

module.exports = routes;
