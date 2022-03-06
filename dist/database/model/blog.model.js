"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BlogSchema = _mongoose.default.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  desc: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: false
  },
  author: {
    type: String,
    required: true
  },
  categories: {
    type: Array,
    required: false
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
});

const Blog = _mongoose.default.model('Blog', BlogSchema);

var _default = Blog;
exports.default = _default;