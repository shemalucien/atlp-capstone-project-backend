import "./database";
import express from 'express';
import cors from 'cors';
import morgan from "morgan";
import mongoose from "mongoose";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import queryRoutes from './routes/query.route';
import authRoutes from './routes/auth.route';
import blogRoutes from './routes/blog.route';
import commentRoutes from './routes/comment.route';
import subscribeRoutes from './routes/subscriber.route';


const server = express();
const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Library API",
			version: "1.0.0",
			description: "A simple Express Library API",
			termsOfService: "http://example.com/terms/",
			contact: {
				name: "API Support",
				url: "http://www.exmaple.com/support",
				email: "support@example.com",
			},
		},

		servers: [
			{
				url: "http://localhost:5000",
				description: "My ATLP API Documentation",
			},
		],
	},
	apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);


// default route
server.get('/', (req, res) => {
	res.status(200).json({ success: true, message: "You successfully landed on My Portfolio API" })
});
server.use(express.json());


server.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
server.use('/api/v1/queries', queryRoutes);
server.use('/api/v1/auth', authRoutes);
server.use('/api/v1/blogs', blogRoutes);
server.use('/api/v1/comments', commentRoutes);
server.use('/api/v1/subscribers', subscribeRoutes);

export default server;