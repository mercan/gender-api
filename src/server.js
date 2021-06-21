const fastify = require("fastify")({
  logger: true,
});
const searchName = require("./utils/searchName");

fastify.register(require("fastify-compress"));
fastify.register(require("fastify-helmet"));

const opts = {
  schema: {
    querystring: {
      name: { type: "string" },
    },
    response: {
      200: {
        type: "object",
        properties: {
          name: { type: "string" },
          gender: { type: "string" },
          country: { type: "string" },
          total_names: { type: "number" },
          probability: { type: "number" },
        },
      },
    },
  },
};

fastify.get("/", opts, (req, res) => {
  if (!req.query.name) {
    return res.code(400).send({ status: 400, message: "Name is required" });
  }

  return res.code(200).send(searchName(req.query.name));
});

fastify.listen(process.env.PORT || 3000, "0.0.0.0", (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  fastify.log.info(`server listening on ${address}`);
});