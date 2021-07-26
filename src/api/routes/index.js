const authRoutes = require("./auth.route");
const nameRoutes = require("./name.route");
const userRoutes = require("./user.route");

module.exports = [...authRoutes, ...nameRoutes, ...userRoutes];
