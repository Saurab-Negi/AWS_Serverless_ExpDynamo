const express = require("express");
const serverless = require("serverless-http");
const userRoutes = require("./src/Routes/userRoute");

const app = express();
app.use(express.json());

// Use user routes
app.use("/user", userRoutes);

// Handle 404
app.use((req, res) => {
  return res.status(404).json({ error: "Not Found" });
});

// Export the serverless handler
exports.handler = serverless(app);