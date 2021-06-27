const nameController = require("../controllers/name.controller");

const routes = [
  {
    method: "GET",
    url: "/api/search/",
    handler: nameController.getName,
  },
];

module.exports = routes;
