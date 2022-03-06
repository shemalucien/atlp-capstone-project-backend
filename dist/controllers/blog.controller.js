"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateBlog = exports.saveBlog = exports.getById = exports.getAllBlogs = exports.deleteBlogById = void 0;

var _blog = _interopRequireDefault(require("../database/model/blog.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const saveBlog = async (req, res) => {
  const blog = req.body;
  const newBlog = new _blog.default(blog);
  await newBlog.save();
  res.status(201).json({
    success: true,
    data: newBlog
  });
};

exports.saveBlog = saveBlog;

const getAllBlogs = async (req, res) => {
  const blogs = await _blog.default.find();
  res.status(200).json({
    success: true,
    data: blogs
  });
};

exports.getAllBlogs = getAllBlogs;

const getById = async (req, res) => {
  const {
    id
  } = req.params;
  const blog = await _blog.default.findById(id);
  if (!blog) return res.status(404).json({
    success: false,
    message: "Blog not found"
  });
  res.status(200).json({
    success: true,
    data: blog
  });
};

exports.getById = getById;

const updateBlog = async (req, res) => {
  const {
    id
  } = req.params;
  const updates = req.body;
  const blog = await _blog.default.findById(id);
  if (!blog) return res.status(404).json({
    success: false,
    message: "Blog not found"
  });
  await _blog.default.findByIdAndUpdate(id, updates);
  res.status(200).json({
    success: true,
    message: "Blog updated successfully"
  });
};

exports.updateBlog = updateBlog;

const deleteBlogById = async (req, res) => {
  const {
    id
  } = req.params;
  const blog = await _blog.default.findById(id);
  if (!blog) return res.status(404).json({
    success: false,
    message: "Blog not found"
  });
  await _blog.default.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    message: "Blog deleted",
    data: blog
  });
};

exports.deleteBlogById = deleteBlogById;