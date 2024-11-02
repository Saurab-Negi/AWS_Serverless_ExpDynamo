const userModel = require("../Models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const validator = require('validator');
const { v4: uuidv4 } = require("uuid");

// Token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '8h' });
};

// SignUp controller
const signUp = async (req, res) => {
  const {firstName, lastName, email, password}= req.body;
  try{    
    if(!firstName){
      return res.sendFormattedResponse(400, false, "First name is required");
    }
    else if(!lastName){
      return res.sendFormattedResponse(400, false, "Last name is required");
    }
    else if(!email){
      return res.sendFormattedResponse(400, false, "Email is required");
    }
    else if(!validator.isEmail(email)){
      return res.sendFormattedResponse(400, false, "Invalid email");
    }
    else if(!password){
      return res.sendFormattedResponse(400, false, "Password is required");
    }
    else if(password.length < 8) {
      return res.sendFormattedResponse(400, false, "Password must be of minimum 8 characters");
    }

    // Check if user with this email already exists
    const lowerCaseEmail = email.toLowerCase();
    const existingUsers = await userModel.query("email").eq(lowerCaseEmail).exec();
    if (existingUsers.count > 0) {
      return res.sendFormattedResponse(409, false, "User with this email already exists");
    }

    const id = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({ id, firstName, lastName, email: lowerCaseEmail, password: hashedPassword });
    await newUser.save();
    res.sendFormattedResponse(201, true, "SignUp successfully");
  }
  catch(error){
    console.error("SignUp Error:", error);
    res.sendFormattedResponse(500, false, "Internal server error", null, error.message);
  }
};

// login controller
const login = async (req, res) => {
  const {email, password}= req.body;
  try{
    if(!email){
      return res.sendFormattedResponse(400, false, "Email is required");
    }
    else if(!validator.isEmail(email)){
      return res.sendFormattedResponse(400, false, "Invalid email");
    }
    else if(!password){
      return res.sendFormattedResponse(400, false, "Password is required");
    }
    else if(password.length < 8) {
      return res.sendFormattedResponse(400, false, "Password must be of minimum 8 characters");
    }

    const lowerCaseEmail = email.toLowerCase();
    const userResponse= await userModel.query("email").eq(lowerCaseEmail).exec();
    if (userResponse.count === 0) {
      return res.sendFormattedResponse(403, false, "User doesn't exist");
    }

    const user = userResponse[0];
    const isMatch= await bcrypt.compare(password, user.password)
    if(!isMatch){
      return res.sendFormattedResponse(403, false, "Invalid credentials");
    }

    const token= createToken(user.id);
    const { id, firstName, lastName, emailVerify, type, createdAt } = user; // Destructure the needed fields
    res.sendFormattedResponse(200, true, "Login successfully", 
      { id, firstName, lastName, email, emailVerify, type, token, createdAt });
  }
  catch(error){
    console.error("Login Error:", error);
    res.sendFormattedResponse(500, false, "Internal server error", null, error.message);
  }
};

module.exports = { signUp, login };