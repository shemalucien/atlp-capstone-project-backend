import "./database";
import express from 'express';
//swagger-ui
import cors from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "./db.json";
import queryRoutes from './routes/query.route';
import authRoutes from './routes/auth.route';
import blogRoutes from './routes/blog.route';
import commentRoutes from './routes/comment.route';
import subscribeRoutes from './routes/subscriber.route';


const server = express();

server.use(cors());
server.use(morgan("dev"));

// default route
server.get('/', (req, res) => {
	res.status(200).json({ success: true, message: "You successfully landed on My Portfolio API" })
});
server.use(express.json());

server.use('/api/v1/queries', queryRoutes);
server.use('/api/v1/auth', authRoutes);
server.use('/api/v1/blogs', blogRoutes);
server.use('/api/v1/comments', commentRoutes);
server.use('/api/v1/subscribers', subscribeRoutes);
server.use("/api/v1/", authRoutes, queryRoutes, blogRoutes, commentRoutes, subscribeRoutes);
server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc, { explorer: true }));
server.use("*", (req, res, next) => {
	res.status(404).json({ error: "NOT FOUND", });
});
export default server;