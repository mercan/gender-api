// User Service
const UserService = require("../../services/User");

// User Validation
const { SignupSchema, SignInSchema } = require("../../validation/user.schema");

const signup = async (req, res) => {
  const validation = SignupSchema.validate(req.body);

  if (validation.error) {
    return res.code(400).send({
      statusCode: 400,
      message: validation.error.details[0].message,
    });
  }

  const userDTO = validation.value;
  const { error, token } = await UserService.Signup(userDTO);

  // error?.code
  if (error && error.code === 11000) {
    return res.code(409).send({
      statusCode: 409,
      message: "Email already exists",
    });
  }

  return res
    .code(200)
    .send({ statusCode: 200, message: "Successfully signed up", token });
};

const signIn = async (req, res) => {
  const validation = SignInSchema.validate(req.body);

  if (validation.error) {
    return res.code(400).send({
      statusCode: 400,
      message: validation.error.details[0].message,
    });
  }

  const userDTO = validation.value;
  const { message, token } = await UserService.SignIn(userDTO);

  if (message) {
    return res.code(400).send({
      statusCode: 400,
      message,
    });
  }

  return res
    .code(200)
    .send({ statusCode: 200, message: "Successfully signed in", token });
};

module.exports = { signup, signIn };
