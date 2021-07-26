const tap = require("tap");
const mongoose = require("mongoose");
const buildFastify = require("../../src/app");
const User = require("../../src/models/User");
const NameService = require("../../src/services/Name");

const signupBody = {
  full_name: "İbrahim Can Mercan",
  email: "email_test@example.com",
  password: "1234567890",
};

const loginBody = {
  email: "email_test@example.com",
  password: "1234567890",
};

const loginBodyEmailError = {
  email: "email_test@gmail.com",
  password: "1234567890",
};

const loginBodyPassError = {
  email: "email_test@example.com",
  password: "1234567",
};

tap.test("POST `auth/signup` Add New User", async (t) => {
  const fastify = buildFastify();

  const response = await fastify.inject({
    method: "POST",
    url: "auth/signup/",
    body: signupBody,
  });

  const body = JSON.parse(response.body);
  const { statusCode, token } = body;

  t.equal(response.statusCode, 200);
  t.type(body, Object);

  t.equal(statusCode, 200);
  t.not(token, undefined);
});

tap.test("POST `auth/signup` New User Email Error", async (t) => {
  const fastify = buildFastify();

  const response = await fastify.inject({
    method: "POST",
    url: "auth/signup/",
    body: signupBody,
  });

  const body = JSON.parse(response.body);
  const { statusCode, message } = body;

  t.equal(response.statusCode, 409);
  t.type(body, Object);

  t.equal(statusCode, 409);
  t.equal(message, "Email already exists");
});

tap.test("POST `auth/signIn` User Sign In", async (t) => {
  const fastify = buildFastify();

  const response = await fastify.inject({
    method: "POST",
    url: "auth/signIn/",
    body: loginBody,
  });

  const body = JSON.parse(response.body);
  const { statusCode, token } = body;

  t.equal(response.statusCode, 200);
  t.type(body, Object);

  t.equal(statusCode, 200);
  t.not(token, undefined);
});

tap.test("POST `auth/signIn` User Sign In Email Error", async (t) => {
  const fastify = buildFastify();

  const response = await fastify.inject({
    method: "POST",
    url: "auth/signIn/",
    body: loginBodyEmailError,
  });

  const body = JSON.parse(response.body);
  const { statusCode, message } = body;

  t.equal(response.statusCode, 400);
  t.type(body, Object);

  t.equal(statusCode, 400);
  t.equal(message, "User not found");
});

tap.test("POST `auth/signIn` User Sign In Email Error", async (t) => {
  const fastify = buildFastify();

  t.teardown(() => fastify.close());
  t.teardown(() => NameService.disconnect());
  t.teardown(() => User.deleteOne({ email: signupBody.email }));
  t.teardown(() => mongoose.connection.close());

  const response = await fastify.inject({
    method: "POST",
    url: "auth/signIn/",
    body: loginBodyPassError,
  });

  const body = JSON.parse(response.body);
  const { statusCode, message } = body;

  t.equal(response.statusCode, 400);
  t.type(body, Object);

  t.equal(statusCode, 400);
  t.equal(message, "Incorrect password");
});
