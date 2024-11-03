const express = require("express");
const userRouter = express.Router();
const { login, signUp } = require("../Controllers/userController");

// Define routes
userRouter.post("/signUp", signUp);
userRouter.post("/login", login);

module.exports = userRouter;