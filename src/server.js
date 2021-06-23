const fastify = require("fastify")({
  logger: false,
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
          names: { type: "array", items: { type: "string" } },
          name: { type: "string" },
          q: { type: "string" },
          gender: { type: "string" },
          country: { type: "string" },
          total_names: { type: "number" },
          probability: { type: "number" },
        },
      },
    },
  },
};

fastify.addHook("onResponse", (request, reply, next) => {
  reply.getResponseTime();
  next();
});

fastify.get("/", (req, res) => {
  if (!req.query.name) {
    return res.code(400).send({
      status: 400,
      message: "Name is required",
      example: "https://gender-api0.herokuapp.com/?name={name}",
      example_: "https://gender-api0.herokuapp.com/?name=İbrahim",
    });
  }

  if (req.query.name.indexOf(",") !== -1) {
    const names = [...new Set(req.query.name.split(","))];

    if (names.length > 100) {
      names.length = 100;
    }

    const data = names
      .map((name) => searchName(name))
      .filter(Boolean)
      .map((obj) => ({ ...obj, duration: res.getResponseTime() }));

    return res.code(200).send(data);
  }

  return res.code(200).send({ ...searchName(req.query.name), duration: res.getResponseTime() });
});

fastify.listen(process.env.PORT || 3000, "0.0.0.0", (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  fastify.log.info(`server listening on ${address}`);
});
