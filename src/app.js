const fastify = require("fastify");

// Database connection
require("./helpers/database")();

function build(opts = {}) {
  const app = fastify(opts);

  app.register(require("fastify-helmet"));
  app.register(require("fastify-formbody"));
  app.register(require("fastify-compress"));
  app.register(require("fastify-rate-limit"), {
    global: false,
    errorResponseBuilder: function (req, context) {
      return {
        statusCode: 429,
        message: "Too Many Requests",
      };
    },
  });

  app.addHook("onResponse", (request, reply, next) => {
    reply.getResponseTime();
    next();
  });

  // routes
  const routes = require("./api/routes/index");
  routes.forEach((route) => app.route(route));

  return app;
}

module.exports = build;
