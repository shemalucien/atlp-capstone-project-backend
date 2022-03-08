"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userProfile = exports.signup = exports.login = void 0;

var _user = _interopRequireDefault(require("../database/model/user.model"));

var _hashPassword = require("../helpers/hash-password");

var _jwt = require("../helpers/jwt");

var _validation_schema = require("../helpers/validation_schema");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const signup = async (req, res) => {
  let user = req.body;
  user.password = await (0, _hashPassword.hash)(user.password);
  const {
    oldUser
  } = await _user.default.findOne(_user.default.email);
  const {
    error
  } = (0, _validation_schema.registerValidation)(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message
    });
  } else if (oldUser) {
    return res.status(409).send("User Already Exist. Please Login");
  } else {
    const newUser = await new _user.default(user);
    newUser.save();
    res.status(201).json({
      success: true,
      message: 'User created',
      data: newUser.email
    });
  }
};

exports.signup = signup;

const login = async (req, res) => {
  const {
    password,
    email,
    role
  } = req.body;
  let user = await _user.default.findOne({
    email
  });

  if (!(email && password && role)) {
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