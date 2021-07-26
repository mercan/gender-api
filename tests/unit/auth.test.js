const tap = require("tap");
const mongoose = require("mongoose");
const buildFastify = require("../../src/app");
const User = require("../../src/models/User");
const NameService = require("../../src/services/Name");
const fastify = buildFastify();

const signupBody = {
  full_name: "İbrahim Can",
  email: "email_test0@example.com",
  password: "1234567890",
};

const signIn = {
  email: "email_test0@example.com",
  password: "1234567890",
};

const signInEmailError = {
  email: "email_test0@gmail.com",
  password: "1234567890",
};

const signInPassError = {
  email: "email_test0@example.com",
  password: "1234567",
};

tap.test("POST `auth/signup` Add New User", async (t) => {
  const response = await fastify.inject({
    method: "POST",
    url: "auth/signup/",
    body: signupBody,
  });

  const body = JSON.parse(response.body);
  const { statusCode, message, token } = body;

  t.equal(response.statusCode, 200);
  t.type(body, Object);

  t.equal(statusCode, 200);
  t.equal(message, "Successfully signed up");
  t.not(token, undefined);
});

tap.test("POST `auth/signup` New User Email Error", async (t) => {
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
  const response = await fastify.inject({
    method: "POST",
    url: "auth/signIn/",
    body: signIn,
  });

  const body = JSON.parse(response.body);
  const { statusCode, message, token } = body;

  t.equal(response.statusCode, 200);
  t.type(body, Object);

  t.equal(statusCode, 200);
  t.equal(message, "Successfully signed in");
  t.not(token, undefined);
});

tap.test("POST `auth/signIn` User Sign In Email Error", async (t) => {
  const response = await fastify.inject({
    method: "POST",
    url: "auth/signIn/",
    body: signInEmailError,
  });

  const body = JSON.parse(response.body);
  const { statusCode, message } = body;

  t.equal(response.statusCode, 400);
  t.type(body, Object);

  t.equal(statusCode, 400);
  t.equal(message, "User not found");
});

tap.test("POST `auth/signIn` User Sign In Email Error", async (t) => {
  t.teardown(() => fastify.close());
  t.teardown(() => NameService.disconnect());
  t.teardown(() => User.deleteOne({ email: signupBody.email }));
  t.teardown(() => mongoose.connection.close());

  const response = await fastify.inject({
    method: "POST",
    url: "auth/signIn/",
    body: signInPassError,
  });

  const body = JSON.parse(response.body);
  const { statusCode, message } = body;

  t.equal(response.statusCode, 400);
  t.type(body, Object);

  t.equal(statusCode, 400);
  t.equal(message, "Incorrect password");
});
