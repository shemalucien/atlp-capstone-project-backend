"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unsubscribe = exports.subscribe = exports.getAllSubscribers = void 0;

var _subscriber = _interopRequireDefault(require("../database/model/subscriber.model"));

var _validation_schema = require("../helpers/validation_schema");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const subscribe = async (req, res) => {
  const {
    error
  } = (0, _validation_schema.subscribersValidation)(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message
    });
  }

  const sub = req.body;
  const newSub = new _subscriber.default(sub);
  await newSub.save();
  res.status(201).json({
    success: true,
    data: newSub
  });
};

exports.subscribe = subscribe;

const unsubscribe = async (req, res) => {
  const {
    email
  } = req.body;
  const sub = await _subscriber.default.findOne(email);
  if (!sub) return res.status(404).json({
    success: false,
    message: "User not found"
  });
  await _subscriber.default.findOneAndDelete(email);
  res.status(200).json({
    success: true,
    message: "Subscription Removed",
    data: null
  });
};

exports.unsubscribe = unsubscribe;

const getAllSubscribers = async (req, res) => {
  const subscribers = await _subscriber.default.find();
  res.status(200).json({
    success: true,
    data: subscribers
  });
};

exports.getAllSubscribers = getAllSubscribers;