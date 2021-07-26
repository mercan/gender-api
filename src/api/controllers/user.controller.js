// User Service
const UserService = require("../../services/User");

const createApiKey = async (req, res) => {
  const apiKey = await UserService.createApiKey(req.user);

  if (apiKey.error) {
    return res.code(400).send({
      statusCode: 400,
      message: apiKey.error,
    });
  }

  return res.code(200).send({
    statusCode: 200,
    message: "API Key created successfully",
    apiKey,
  });
};

module.exports = { createApiKey };
