"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveComment = exports.getAllComments = exports.deleteCommentById = void 0;

var _comment = _interopRequireDefault(require("../database/model/comment.model"));

var _validation_schema = require("../helpers/validation_schema");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const saveComment = async (req, res) => {
  const {
    error
  } = (0, _validation_schema.commentsValidation)(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message
    });
  }

  const comment = req.body;
  const newComment = new _comment.default(comment);
  await newComment.save();
  res.status(201).json({
    success: true,
    data: newComment
  });
};

exports.saveComment = saveComment;

const getAllComments = async (req, res) => {
  const comments = await _comment.default.find();
  res.status(200).json({
    success: true,
    data: comments
  });
};

exports.getAllComments = getAllComments;

const deleteCommentById = async (req, res) => {
  const {
    id
  } = req.params;
  const comment = await _comment.default.findById(id);
  if (!comment) return res.status(404).json({
    success: false,
    message: "Comment not found"
  });
  await _comment.default.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    message: "Comment deleted",
    data: null
  });
};

exports.deleteCommentById = deleteCommentById;