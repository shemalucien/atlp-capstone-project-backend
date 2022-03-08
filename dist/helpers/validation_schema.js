"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subscribersValidation = exports.registerValidation = exports.queryValidation = exports.commentsValidation = exports.blogValidation = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const registerValidation = user => {
  const schema = _joi.default.object({
    firstName: _joi.default.string().min(5).required(),
    lastName: _joi.default.string().min(5).required(),
    role: _joi.default.string().min(5).required(),
    email: _joi.default.string().min(5).required().email(),
    password: _joi.default.string().min(5).required()
  });

  return schema.validate(user);
};

exports.registerValidation = registerValidation;

const blogValidation = blog => {
  const schema = _joi.default.object({
    title: _joi.default.string().min(6).required(),
    desc: _joi.default.string().min(6).required(),
    photo: _joi.default.string().min(3).required(),
    categories: _joi.default.string().min(6).required()
  });

  return schema.validate(blog);
};

exports.blogValidation = blogValidation;

const queryValidation = query => {
  const schema = _joi.default.object({
    name: _joi.default.string().min(2),
    email: _joi.default.string().min(2).required().email(),
    message: _joi.default.string().min(10)
  });

  return schema.validate(query);
};

exports.queryValidation = queryValidation;

const commentsValidation = comment => {
  const schema = _joi.default.object({
    name: _joi.default.string().min(6).required(),
    comment: _joi.default.string().min(6).required(),
    email: _joi.default.string().min(6).required().email()
  });

  return schema.validate(comment);
};

exports.commentsValidation = commentsValidation;

const subscribersValidation = subscriber => {
  const schema = _joi.default.object({
    email: _joi.default.string().min(6).required().email()
  });

  return schema.validate(subscriber);
};

exports.subscribersValidation = subscribersValidation;