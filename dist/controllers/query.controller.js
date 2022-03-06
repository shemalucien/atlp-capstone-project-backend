"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateQuery = exports.saveQuery = exports.getById = exports.getAllQueries = exports.deleteQueryById = void 0;

var _query = _interopRequireDefault(require("../database/model/query.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const saveQuery = async (req, res) => {
  const query = req.body;
  const newQuery = new query();
  await newQuery.save();
  res.status(201).json({
    success: true,
    data: newQuery
  });
};

exports.saveQuery = saveQuery;

const getAllQueries = async (req, res) => {
  const queries = await _query.default.find();
  res.status(200).json({
    success: true,
    data: queries
  });
};

exports.getAllQueries = getAllQueries;

const getById = async (req, res) => {
  const {
    id
  } = req.params;
  const query = await _query.default.findById(id);
  if (!query) return res.status(404).json({
    success: false,
    message: "Query not found"
  });
  res.status(200).json({
    success: true,
    data: query
  });
};

exports.getById = getById;

const updateQuery = async (req, res) => {
  const {
    id
  } = req.params;
  const updates = req.body;
  const query = await _query.default.findById(id);
  if (!query) return res.status(404).json({
    success: false,
    message: "Query not found"
  });
  await _query.default.findByIdAndUpdate(id, updates);
  res.status(200).json({
    success: true,
    message: "Query updated successfully"
  });
};

exports.updateQuery = updateQuery;

const deleteQueryById = async (req, res) => {
  const {
    id
  } = req.params;
  const query = await _query.default.findById(id);
  if (!query) return res.status(404).json({
    success: false,
    message: "Query not found"
  });
  await _query.default.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    message: "Query deleted",
    data: query
  });
};

exports.deleteQueryById = deleteQueryById;