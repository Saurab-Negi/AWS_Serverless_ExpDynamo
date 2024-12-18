const dynamoose = require("dynamoose");
const validator = require("validator");

const TEACHERS_TABLE = process.env.TEACHERS_TABLE;

const teacherModel = dynamoose.model(TEACHERS_TABLE, {
  id: {
    type: String,
    hashKey: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: {
      global: true,
      name: "EmailIndex",
    },
    validate: (value) => validator.isEmail(value),
  },
  phone: {
    type: String,
    validate: (value) => validator.isMobilePhone(value),
  },
  qualification: {
    type: String,
  },
  dob: {
    type: String,
    validate: (value) => validator.isDate(value, { format: "DD-MM-YYYY", strictMode: false }),
  },  
  gender: {
    type: String,
    enum: ["Male", "Female"],
  },
  address: {
    type: String,
  },
  classesCanTeach: {
    type: Array,
    schema: [String],
  },
  experience: {
    type: Number,
  },
  subjects: {
    type: Array,
    schema: [String],
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
},{ create: false });

module.exports = teacherModel;