"use strict";

require("./database");

var _express = _interopRequireDefault(require("express"));

var _query = _interopRequireDefault(require("./routes/query.route"));

var _auth = _interopRequireDefault(require("./routes/auth.route"));

var _blog = _interopRequireDefault(require("./routes/blog.route"));

var _comment = _interopRequireDefault(require("./routes/comment.route"));

var _subscriber = _interopRequireDefault(require("./routes/subscriber.route"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const server = (0, _express.default)(); // default route

server.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: "You successfully landed on My Portfolio API"
  });
});
server.use(_express.default.json());
server.use('/api/v1/queries', _query.default);
server.use('/api/v1/auth', _auth.default);
server.use('/api/v1/blogs', _blog.default);
server.use('/api/v1/comments', _comment.default);
server.use('/api/v1/subscribers', _subscriber.default);
const port = process.env.port || 5000;
server.listen(port, () => {
  console.log("Server listening on port " + port);
});