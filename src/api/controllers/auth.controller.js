// User Service
const UserService = require("../../services/user");

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
  switch (error && error.code) {
    case 11000:
      return res
        .code(400)
        .send({ statusCode: 400, message: `${error.keyPattern[0]} is already in use.` });

    default:
      break;
  }

  return res.code(200).send({ statusCode: 200, token });
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

  return res.code(200).send({ statusCode: 200, token });
};

module.exports = { signup, signIn };
