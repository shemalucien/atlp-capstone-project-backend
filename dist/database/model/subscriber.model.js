"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const subscriberSchema = new _mongoose.default.Schema({
  email: {
    type: String,
    required: true
  }
});

const Subscriber = _mongoose.default.model('Subscriber', subscriberSchema);

var _default = Subscriber;
exports.default = _default;