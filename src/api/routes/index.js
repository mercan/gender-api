const authRoutes = require("./auth.route");
const nameRoutes = require("./name.route");

module.exports = [...authRoutes, ...nameRoutes];
