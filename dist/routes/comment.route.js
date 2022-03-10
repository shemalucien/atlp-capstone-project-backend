"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _comment = require("../controllers/comment.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.post('/', _comment.saveComment);
router.get('/', _comment.getAllComments);
router.delete('/:id', _comment.deleteCommentById);
var _default = router;
exports.default = _default;