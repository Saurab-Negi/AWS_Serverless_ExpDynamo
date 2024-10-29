const express = require("express");
const router = express.Router();
const { getUserById, addUser } = require("../Controllers/userController");

// Define routes
router.get("/getUser/:id", getUserById);
router.post("/addUser", addUser);

module.exports = router;