const dynamoose = require("dynamoose");

// Set the DynamoDB table name from environment variables
const USERS_TABLE = process.env.USERS_TABLE;

// Create a Dynamoose model for the user
const UserModel = dynamoose.model(USERS_TABLE, {
  id: {
    type: String,
    hashKey: true, // Set as primary key
  },
  username: String,
  email: String,
},{ create: false, timestamps: true });

module.exports = UserModel;