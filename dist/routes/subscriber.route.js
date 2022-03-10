"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _subscribers = require("../controllers/subscribers.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.post('/subscribe', _subscribers.subscribe);
router.delete('/unsubscribe', _subscribers.unsubscribe);
router.get('/', _subscribers.getAllSubscribers);
var _default = router;
exports.default = _default;