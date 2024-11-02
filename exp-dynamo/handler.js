const express = require("express");
const serverless = require("serverless-http");
const responseFormatter= require('./src/middlewares/responseFormatter');
const userRoutes = require("./src/Routes/userRoute");

const app = express();

// Middlewares
app.use(express.json());
app.use(responseFormatter);

// Use user routes
app.use("/", userRoutes);

// Export the serverless handler
exports.handler = serverless(app);