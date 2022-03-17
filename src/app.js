import "./database";
import express from 'express';
import cors from "cors";
import queryRoutes from './routes/query.route';
import authRoutes from './routes/auth.route';
import blogRoutes from './routes/blog.route';
import commentRoutes from './routes/comment.route';
import subscribeRoutes from './routes/subscriber.route';
const server = express();

// default route
server.get('/', (req, res) => {
	res.status(200).json({ success: true, message: "You successfully landed on My Portfolio API" })
});
server.use(express.json());
server.use(cors());
server.use('/api/v1/queries', queryRoutes);
server.use('/api/v1/auth', authRoutes);
server.use('/api/v1/blogs', blogRoutes);
server.use('/api/v1/comments', commentRoutes);
server.use('/api/v1/subscribers', subscribeRoutes);

export default server;