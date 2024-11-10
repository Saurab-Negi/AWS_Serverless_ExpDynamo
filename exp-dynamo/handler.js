const express = require("express");
const serverless = require("serverless-http");
const responseFormatter= require('./src/middlewares/responseFormatter');
const userRoutes = require("./src/Routes/userRoute");
const teacherRoutes = require("./src/Routes/teacherRoute");
const reportRoutes= require("./src/Routes/reportRoute");
const videoRoutes= require("./src/Routes/videoRoute");

const app = express();

// Middlewares
app.use(express.json());
app.use(responseFormatter);

// Use user routes
app.use("/", userRoutes);
app.use("/", teacherRoutes);
app.use("/", reportRoutes);
app.use("/", videoRoutes);

// Export the serverless handler
exports.handler = serverless(app);