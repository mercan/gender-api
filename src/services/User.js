const tokenCreate = require("../utils/tokenCreate");
const userModel = require("../models/User");

const Dependencies = {
  userModel,
};

class UserService {
  constructor({ userModel }) {
    this.userModel = userModel;
  }

  async Signup(user) {
    try {
      const userRecord = await this.userModel.create(user);
      return { token: tokenCreate(userRecord) };
    } catch (err) {
      return {
        error: {
          code: err.code,
          keyPattern: Object.keys(err.keyPattern),
        },
      };
    }
  }

  async SignIn({ email, password }) {
    const userRecord = await this.userModel.findOne({ email });

    if (!userRecord) {
      return { message: "User not found" };
    }

    const isMatch = userRecord.comparePassword(password);

    if (!isMatch) {
      return { message: "Incorrect password" };
    }

    return { token: tokenCreate(userRecord) };
  }

  async createApiKey(user) {
    const userRecord = await this.userModel.findOne({ email: user.email });

    if (!userRecord) {
      return { error: "User not found" };
    }

    const apiKey = await userRecord.createApiKey();

    return apiKey;
  }

  async findByApiKey(apiKey) {
    const userRecord = await this.userModel.findByApiKey(apiKey);

    if (!userRecord) {
      return { error: "User not found" };
    }

    return userRecord;
  }
}

module.exports = new UserService(Dependencies);
