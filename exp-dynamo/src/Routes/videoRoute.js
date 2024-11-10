const express = require("express");
const videoRouter = express.Router();
const { addVideo, getVideos } = require("../Controllers/videoController");

videoRouter.post("/addVideo", addVideo);
videoRouter.get("/getVideos", getVideos);

module.exports= videoRouter;