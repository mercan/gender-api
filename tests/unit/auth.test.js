const tap = require("tap");
const buildFastify = require("../../src/app");
const mongoose = require("mongoose");

tap.test("POST `auth/signup` Add New User", async (t) => {
  const fastify = buildFastify();

  t.teardown(() => fastify.close());
  t.teardown(() => mongoose.connection.close());

  const response = await fastify.inject({
    method: "POST",
    url: "auth/signup/",
    body: { name: "İbrahim" },
  });

  const body = JSON.parse(response.body);
  const { name, gender, country } = body;

  t.equal(response.statusCode, 200);
  t.type(body, Object);

  t.equal(name, "İbrahim");
  t.equal(gender, "Male");
  t.equal(country, "TR");
});

tap.test("POST `auth/signIn` User SignIn", async (t) => {
  const fastify = buildFastify();

  t.teardown(() => fastify.close());
  t.teardown(() => mongoose.connection.close());

  const response = await fastify.inject({
    method: "POST",
    url: "auth/signIn/",
    body: { name: "İbrahim" },
  });

  const body = JSON.parse(response.body);
  const { name, gender, country } = body;

  t.equal(response.statusCode, 200);
  t.type(body, Object);

  t.equal(name, "İbrahim");
  t.equal(gender, "Male");
  t.equal(country, "TR");
});
