"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userProfile = exports.signup = exports.login = void 0;

var _user = _interopRequireDefault(require("../database/model/user.model"));

var _hashPassword = require("../helpers/hash-password");

var _jwt = require("../helpers/jwt");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const { authSchema } = require('../helpers/validation_schema');
const signup = async (req, res) => {
  let user = req.body; // const result = await authSchema.validateAsync(req.body)

  user.password = await (0, _hashPassword.hash)(user.password);
  const oldUser = await _user.default.findOne(_user.default.email);

  if (oldUser) {
    return res.status(409).send("User Already Exist. Please Login");
  }

  if (!result) {
    return res.status(409).send("Invalid email");
  }

  const newUser = await new _user.default(user);
  newUser.save();
  res.status(201).json({
    success: true,
    message: 'User created',
    data: newUser
  });
};

exports.signup = signup;

const login = async (req, res) => {
  const {
    password,
    email
  } = req.body; // Validate if user exist in our database

  let user = await _user.default.findOne({
    email
  }); // Validate user input

  if (!(email && password)) {
    res.status(400).send("All input is required");
  }

  if (!user) return res.status(401).json({
    success: false,
    message: "Invalid email or password"
  });
  const isPasswordValid = await (0, _hashPassword.verify)(user.password, password);
  if (!isPasswordValid) return res.status(401).json({
    success: false,
    message: "Invalid email or password"
  });
  const {
    _id,
    firstName,
    lastName
  } = user;
  const token = (0, _jwt.signToken)(JSON.stringify({
    _id,
    firstName,
    lastName,
    email: user.email
  }));
  return res.status(200).json({
    success: true,
    message: "successfully logged in",
    token
  });
};

exports.login = login;

const userProfile = (req, res) => {
  const bearerToken = req.headers.authorization;
  const token = bearerToken.split(" ")[1];
  const payload = (0, _jwt.decodeToken)(token);
  return res.status(200).json({
    success: true,
    data: payload
  });
};

exports.userProfile = userProfile;