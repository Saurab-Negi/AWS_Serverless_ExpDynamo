const express = require("express");
const teacherRouter = express.Router();
const { addTeacher } = require("../Controllers/teacherController");

teacherRouter.post("/addTeacher", addTeacher);

module.exports= teacherRouter;