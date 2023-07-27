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
            : "user with this email already exists, try signing in with some other email",
      };
    }
    return {
      isEmailValid: true,
      userData: null,
      msg:
        attempt == "signup"
          ? "email not in the database,we are good to signup"
          : "email not found, try signing-up first",
    };
  }
}

module.exports = { Validator };
