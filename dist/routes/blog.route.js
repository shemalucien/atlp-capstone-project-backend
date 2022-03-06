"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _blog = require("../controllers/blog.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.post('/', _blog.saveBlog);
router.get('/', _blog.getAllBlogs);
router.get('/:id', _blog.getById);
router.delete('/:id', _blog.deleteBlogById);
router.put('/:id', _blog.updateBlog);
var _default = router;
exports.default = _default;