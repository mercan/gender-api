require("dotenv").config();
const fastify = require("fastify");

// Database connection
require("./helpers/database")();

function build(opts = {}) {
  const app = fastify(opts);
  // Database Connect Close

  app.register(require("fastify-compress"));
  app.register(require("fastify-helmet"));

  app.addHook("onResponse", (_request, reply, next) => {
    reply.getResponseTime();
    next();
  });

  // Name Routes
  const nameRoutes = require("./routes/name.routes");
  nameRoutes.forEach((route) => app.route(route));

  return app;
}

module.exports = build;
