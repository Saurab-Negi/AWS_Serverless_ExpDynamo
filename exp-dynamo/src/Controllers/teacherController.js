const teacherModel= require("../Models/teacherModel");
const { v4: uuidv4 } = require("uuid");

const addTeacher= async (req, res) =>{
    const { name, email, phone, qualification, dob, gender, address, classesCanTeach, experience, subjects } = req.body;

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

const getTeachers= async (req, res) => {
    try {
        const teachers = await teacherModel.scan().exec();

        // Check if there are no teachers
        if (teachers.count === 0) {
            return res.sendFormattedResponse(404, false, "No teachers found.");
        }

        res.sendFormattedResponse(200, true, null, { teachers, teachersCount: teachers.count });
    } catch (error) {
        console.error("getTeachers Error:", error);
        res.sendFormattedResponse(500, false, "Internal server error", error.message);
    }
}

module.exports = { addTeacher, getTeachers };