import "./database";
import express from 'express';
//swagger-ui
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "./db.json";
import cors from "cors";
import queryRoutes from './routes/query.route';
import authRoutes from './routes/auth.route';
import blogRoutes from './routes/blog.route';
import subscribeRoutes from './routes/subscriber.route';
import projectRoutes from './routes/project.route';
import experienceRoutes from './routes/experience.route';
const server = express();
server.use(morgan("dev"));
server.use(cors());
// default route
server.get('/', (req, res) => {
	res.status(200).json({ success: true, message: "You successfully landed on My Portfolio API" })
});
server.use(express.json());





// default route
server.get('/', (req, res) => {
	res.status(200).json({ success: true, message: "You successfully landed on My Portfolio API" })
});
server.use(express.json());
server.use('/api/v1/queries', queryRoutes);
server.use('/api/v1/auth', authRoutes);
server.use('/api/v1/blogs', blogRoutes);
server.use('/api/v1/projects', projectRoutes);
server.use('/api/v1/experiences', experienceRoutes);

server.use('/api/v1/subscribers', subscribeRoutes);
server.use("/api/v1/", authRoutes, queryRoutes, blogRoutes, subscribeRoutes);
server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc, { explorer: true }));
server.use("*", (req, res, next) => {
	res.status(404).json({ error: "NOT FOUND", });
});
export default server;