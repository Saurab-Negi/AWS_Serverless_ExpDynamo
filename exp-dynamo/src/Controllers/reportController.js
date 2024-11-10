const { v4: uuidv4 } = require("uuid");
const reportModel= require("../Models/reportModel");

const createReport = async (req, res) => {
    const { studentName, marks, assignmentMarks, testMarks, level,  } = req.body;

    const report = new reportModel({
        id: uuidv4(),
        studentName,
        marks,
        assignmentMarks,
        testMarks,
        level
    });
    try {
        await report.save();
        res.sendFormattedResponse(200, true, "Report created successfully");
    } catch (error) {
        console.error("createReport Error:", error);
        res.sendFormattedResponse(500, false, "Internal server error", error.message);
    }
};

const getReports = async (req, res) => {
    try {
        const reports = await reportModel.scan().exec();

        // Check if there are no reports
        if (reports.count === 0) {
            return res.sendFormattedResponse(404, false, "No reports found.");
        }

        res.sendFormattedResponse(200, true, null, { reports, reportsCount: reports.count });
    } catch (error) {
        console.error("getReports Error:", error);
        res.sendFormattedResponse(500, false, "Internal server error", error.message);
    }
};

module.exports = { createReport, getReports };