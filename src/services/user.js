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
      return { error: { code: err.code, keyPattern: Object.keys(err.keyPattern) } };
    }
  }

  async SignIn({ email, password }) {
    const userRecord = await this.userModel.findOne({ email });

    if (!userRecord) {
      return { message: "Email not registered." };
    }

    const isMatch = userRecord.comparePassword(password);

    if (!isMatch) {
      return { message: "Password is incorrect." };
    }

    return { token: tokenCreate(userRecord) };
  }
}

module.exports = new UserService(Dependencies);
