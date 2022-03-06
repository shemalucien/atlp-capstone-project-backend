"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _query = require("../controllers/query.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.post('/', _query.saveQuery);
router.get('/', _query.getAllQueries);
router.get('/:id', _query.getById);
router.put('/:id', _query.updateQuery);
router.delete('/:id', _query.deleteQueryById);
var _default = router;
exports.default = _default;