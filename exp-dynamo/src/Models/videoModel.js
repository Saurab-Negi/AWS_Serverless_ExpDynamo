const dynamoose = require("dynamoose");

const VIDEO_TABLE = process.env.VIDEO_TABLE;

const videoModel = dynamoose.model(VIDEO_TABLE, {
  id: {
    type: String,
    hashKey: true,
  },
  subjectName: {
    type: String,
    required: true,
    index: {
      global: true,
      name: "SubjectNameIndex",
    },
  },
  Class: {
    type: String,
  },
  chapters: {
    type: Array,
    schema: [
      {
        type: Object,
        schema: {
          chapter: {
            type: String,
            required: true,
          },
          topic: {
            type: Array,
            schema: [
              {
                type: Object,
                schema: {
                  topicName: String,
                  videoFile: String,
                },
              },
            ],
          },
        },
      },
    ],
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
}, { create: false });

module.exports = videoModel;