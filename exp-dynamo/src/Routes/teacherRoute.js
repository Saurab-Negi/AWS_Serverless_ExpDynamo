const express = require("express");
const teacherRouter = express.Router();
const { addTeacher, getTeachers } = require("../Controllers/teacherController");

teacherRouter.post("/addTeacher", addTeacher);
teacherRouter.get("/getTeachers", getTeachers);

module.exports= teacherRouter;