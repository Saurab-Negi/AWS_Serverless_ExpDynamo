const dynamoose = require("dynamoose");

// Set the DynamoDB table name from environment variables
const USERS_TABLE = process.env.USERS_TABLE;

// Create a Dynamoose model for the user
const userModel = dynamoose.model(USERS_TABLE, {
  id: {
    type: String,
    hashKey: true, // Set as primary key
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: {
      global: true,   // Define a GSI on email
      name: "EmailIndex",
    },
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: Number,
    default: 1,
  },
  emailVerify: {
    type: Number,
    default: 0,
  },
  dob: {
    type: String,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  pinCode: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
},{ create: false });

module.exports = userModel;