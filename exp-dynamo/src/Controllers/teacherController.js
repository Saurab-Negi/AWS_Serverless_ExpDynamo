const teacherModel= require("../Models/teacherModel");
const validator = require('validator');
const { v4: uuidv4 } = require("uuid");

const addTeacher= async (req, res) =>{
    const { name, email, phone, qualification, dob, gender, address, classesCanTeach, experience, subjects } = req.body;

    if (!validator.isEmail(email)) {
        return res.sendFormattedResponse(400, false, "Invalid email format.");
    }
    const teacher = new teacherModel({
        id: uuidv4(),
        name,
        email,
        phone,
        qualification,
        dob,
        gender,
        address,
        classesCanTeach,
        experience,
        subjects,
    });
    try {
        await teacher.save();
        res.sendFormattedResponse(200, true, "Teacher added successfully");
    } catch (error) {
        console.error("addTeacher Error:", error);
        // const errorMessage = error.message.includes("duplicate key") ? "Email already exists." : "Internal server error";
        res.sendFormattedResponse(500, false, "Internal server error", error.message);
    }
}

module.exports = { addTeacher };