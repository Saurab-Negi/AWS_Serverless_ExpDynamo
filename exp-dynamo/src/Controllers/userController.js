const UserModel = require("../Models/userModel");
const { v4: uuidv4 } = require("uuid");

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const user = await UserModel.get(req.params.id);
    if (user) {
      const { id, username, email } = user;
      res.json({ id, username, email });
    } else {
      res.status(404).json({ error: 'Could not find user with "id"' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not retrieve user" });
  }
};

// Add a new user
const addUser = async (req, res) => {
  const { username, email } = req.body;

  // Validate input
  if (typeof username !== "string") {
    return res.status(400).json({ error: '"username" must be a string' });
  }
  if (typeof email !== "string") {
    return res.status(400).json({ error: '"email" must be a string' });
  }

  // Generate a new UUID for the user ID
  const id = uuidv4();
  const user = new UserModel({ id, username, email });

  try {
    await user.save();
    res.json({ id, username, email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not create user" });
  }
};

module.exports = { getUserById, addUser };