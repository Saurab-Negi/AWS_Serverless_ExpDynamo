const { v4: uuidv4 } = require("uuid");
const videoModel= require("../Models/videoModel");

const addVideo = async (req, res) => {
  const { subjectName, Class, chapter, topics } = req.body;

  try {
    // Check if a video record with the same subjectName and Class already exists
    const existingRecords = await videoModel
      .query("subjectName")
      .eq(subjectName)
      .and()
      .where("Class")
      .eq(Class)
      .exec();

    if (existingRecords && existingRecords.length > 0) {
      // If record exists, update it by adding chapter and topics
      const record = existingRecords[0];

      // Check if the chapter already exists
      let chapterExists = false;
      for (let ch of record.chapters) {
        if (ch.chapterName === chapter) {
          // If the chapter exists, add new topics to it
          ch.topics.push(...topics);
          chapterExists = true;
          break;
        }
      }

      if (!chapterExists) {
        // If the chapter does not exist, add a new chapter with topics
        record.chapters.push({ chapterName: chapter, topics });
      }

      // Save the updated record
      await record.save();
      res.sendFormattedResponse(200, true, "Video updated successfully");

    } else {
      // If no entry exists, create a new video record
      const newVideo = new videoModel({
        id: uuidv4(),
        subjectName,
        Class,
        chapters: [{ chapterName: chapter, topics }],
        createdAt: new Date(),
      });

      await newVideo.save();
      res.sendFormattedResponse(200, true, "Video added successfully");
    }
  } catch (error) {
    console.error("addVideo Error:", error);
    res.sendFormattedResponse(500, false, "Internal server error", error.message);
  }
};

const getVideos = async (req, res) => {
    try {
        const videos = await videoModel.scan().exec();

        // Check if there are no videos
        if (videos.count === 0) {
            return res.sendFormattedResponse(404, false, "No videos found.");
        }

        res.sendFormattedResponse(200, true, null, { videos, videosCount: videos.count });
    } catch (error) {
        console.error("getVideos Error:", error);
        res.sendFormattedResponse(500, false, "Internal server error", error.message);
    }
};

module.exports = { addVideo, getVideos };