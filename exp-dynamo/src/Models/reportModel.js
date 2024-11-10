const dynamoose = require("dynamoose");

const REPORT_TABLE = process.env.REPORT_TABLE;

const reportModel = dynamoose.model(REPORT_TABLE, {
  id: {
    type: String,
    hashKey: true,
  },
  studentName: {
    type: String,
    required: true,
    index: {
        global: true,
        name: "StudentNameIndex",
    },
  },
  marks: {
    type: String,
  },
  assignmentMarks: {
    type: String,
  },
  testMarks: {
    type: String,
  },
  level: {
    type: String,
    enum: ["Weak", "Strong"],
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
},{ create: false });

module.exports = reportModel;