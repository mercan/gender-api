const dotenv = require("dotenv").config();
const fastify = require("fastify")({
  logger: false,
});
const searchName = require("./utils/searchName");

// Database connection
require("./helpers/database")();

fastify.register(require("fastify-compress"));
fastify.register(require("fastify-helmet"));

fastify.addHook("onResponse", (_request, reply, next) => {
  reply.getResponseTime();
  next();
});

// Name Routes
const nameRoutes = require("./routes/name.routes");
nameRoutes.forEach((route) => fastify.route(route));

fastify.listen(process.env.PORT || 3000, "0.0.0.0", (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  fastify.log.info(`server listening on ${address}`);
});
