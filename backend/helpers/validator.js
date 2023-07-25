const User = require("../models/user");

class Validator {
  constructor() {}
  async getUser(email, { attempt }) {
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) == false
    ) {
      return {
        usersData: null,
        isEmailValid: false,
        msg: "email address entered is not valid",
      };
    }
    const user = await User.findOne({ email });
    if (user) {
      return {
        isEmailValid: true,
        userData: user,
        msg:
          attempt == "logIn"
            ? "user exists, we are good to login "
            : "user already exists, try signing in",
      };
    }
    return {
      isEmailValid: true,
      userData: null,
      msg:
        attempt == "register"
          ? "email not in the database,we are good to register"
          : "email not found, try registering first",
    };
  }
}

module.exports = { Validator };
