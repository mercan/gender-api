const tap = require("tap");
const buildFastify = require("../../src/app");
const mongoose = require("mongoose");
const Names = require("../../src/lib/Names");

tap.test("GET `search` route 'Single - Name Search'", async (t) => {
  const fastify = buildFastify();

  const response = await fastify.inject({
    method: "GET",
    url: "search/",
    query: { name: "İbrahim" },
  });

  const body = JSON.parse(response.body);
  const { name, gender, country } = body;

  t.equal(response.statusCode, 200);
  t.type(body, Object);

  t.equal(name, "İbrahim");
  t.equal(gender, "Male");
  t.equal(country, "TR");
});

tap.test("GET `search` route 'Multiple - Name Search'", async (t) => {
  const fastify = buildFastify();

  const response = await fastify.inject({
    method: "GET",
    url: "search/",
    query: { name: "İbrahim,Ayşe,James,Elizabeth" },
  });

  const body = JSON.parse(response.body);

  t.equal(response.statusCode, 200);
  t.type(body, Array);

  t.equal(body[0].name, "İbrahim");
  t.equal(body[0].gender, "Male");
  t.equal(body[0].country, "TR");

  t.equal(body[1].name, "Ayşe");
  t.equal(body[1].gender, "Female");
  t.equal(body[1].country, "TR");

  t.equal(body[2].name, "James");
  t.equal(body[2].gender, "Male");
  t.equal(body[2].country, "US");

  t.equal(body[3].name, "Elizabeth");
  t.equal(body[3].gender, "Female");
  t.equal(body[3].country, "US");
});

tap.test("GET `search` route 'Single - Double Name Search'", async (t) => {
  const fastify = buildFastify();

  const response = await fastify.inject({
    method: "GET",
    url: "search/",
    query: { name: "İbrahim Can" },
  });

  const body = JSON.parse(response.body);
  const { name, gender, country, names } = body;

  t.equal(response.statusCode, 200);
  t.type(body, Object);
  t.type(names, Array);

  t.equal(name, "İbrahim Can");
  t.equal(gender, "Male");
  t.equal(country, "TR");

  t.equal(names[0].name, "İbrahim");
  t.equal(names[0].gender, "Male");
  t.equal(names[0].country, "TR");

  t.equal(names[1].name, "Can");
  t.equal(names[1].gender, "Male");
  t.equal(names[1].country, "TR");
});

tap.test("GET `search` route 'Multiple - Double Name Search'", async (t) => {
  const fastify = buildFastify();

  t.teardown(() => fastify.close());
  t.teardown(() => mongoose.connection.close());
  t.teardown(() => Names.disconnect());

  const response = await fastify.inject({
    method: "GET",
    url: "search/",
    query: { name: "İbrahim Can,Ayşe Gül" },
  });

  const body = JSON.parse(response.body);

  t.equal(response.statusCode, 200);
  t.type(body, Object);
  t.type(body[0].names, Array);
  t.type(body[1].names, Array);

  t.equal(body[0].names[0].name, "İbrahim");
  t.equal(body[0].names[0].gender, "Male");
  t.equal(body[0].names[0].country, "TR");

  t.equal(body[0].names[1].name, "Can");
  t.equal(body[0].names[1].gender, "Male");
  t.equal(body[0].names[1].country, "TR");

  t.equal(body[1].names[0].name, "Ayşe");
  t.equal(body[1].names[0].gender, "Female");
  t.equal(body[1].names[0].country, "TR");

  t.equal(body[1].names[1].name, "Gül");
  t.equal(body[1].names[1].gender, "Female");
  t.equal(body[1].names[1].country, "TR");
});
