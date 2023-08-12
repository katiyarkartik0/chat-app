const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const { Validator } = require("../helpers/validator");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const validator = new Validator();
  const { getUser, inputValidation } = validator;
  const { isInputValid, msg: inputValidationMessage } = inputValidation([
    name,
    email,
    password,
  ]);
  if (!isInputValid) {
    return res.status(400).json({
      msg:inputValidationMessage,
      isInputValid,
    });
  }
  const { userData, msg, isEmailValid } = await getUser(email, {
    attempt: "signup",
  });
  if (!isEmailValid || userData) {
    return res.status(400).json({
      isEmailValid: false,
      accessToken: null,
      msg,
    });
  }
  const newUser = new User({
    name,
    email,
    password: bcrypt.hashSync(password.toString(), 4),
  });

  try {
    await newUser.save();
    return res.status(200).json({
      isEmailValid: true,
      msg:"Account created Successfully!",
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

const logInUser = async (req, res) => {
  const { email, password } = req.body;
  const validator = new Validator();
  const { userData, msg, isEmailValid } = await validator.getUser(email, {
    attempt: "logIn",
  });
  if (!isEmailValid || !userData) {
    return res.status(400).json({
      isEmailValid: isEmailValid && userData,
      accessToken: null,
      msg,
    });
  }
  const isPasswordValid = bcrypt.compareSync(
    password.toString(),
    userData.password.toString()
  );
  if (!isPasswordValid) {
    return res.status(400).json({
      isEmailValid,
      isPasswordValid,
      accessToken: null,
      msg: "invalid password",
    });
  }
  const token = jwt.sign({ id: userData._id }, process.env.API_SECRET, {
    expiresIn: 86400,
  });
  userData.password = null;
  try {
    return res.status(200).json({
      isEmailValid,
      isPasswordValid,
      userData,
      msg: "login successful",
      accessToken: token,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = { registerUser, logInUser };
