const express = require("express");
const reportRouter = express.Router();
const { createReport, getReports } = require("../Controllers/reportController");

reportRouter.post("/createReport", createReport);
reportRouter.get("/getReports", getReports);

module.exports= reportRouter;