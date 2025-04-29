import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { validateEmail } from "../utils/helper.js";
import { createToken } from "../utils/jwt.js";

const register = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;

    if (!name) {
      return res.status(400).json({ error: true, message: "Name is required." });
    }

    if (!email) {
      return res.status(400).json({ error: true, message: "Email is required." });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ error: true, message: "Email's format is not valid." });
    }

    if (!username) {
      return res.status(400).json({ error: true, message: "Username is required." });
    }

    if (!password) {
      return res.status(400).json({ error: true, message: "Password is required." });
    }

    const userExists = await User.findOne({ username });

    if (userExists) {
      return res.status(400).json({ error: true, message: `Username ${username} already exists.` });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let newUser = new User({
      name: name,
      username: username,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ error: false, message: "Registered successfully." });
  } catch (error) {
    res.status(500).json({ message: `Error register method: ${error.message}.` });
  }
}

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username) {
      return res.status(400).json({ error: true, message: "Username is required." });
    }

    const userExists = await User.findOne({ username });

    if (!userExists) {
      return res.status(404).json({ error: true, message: `Username ${username} is not found.` });
    }

    if (!password) {
      return res.status(400).json({ error: true, message: "Password is required." });
    }

    createToken(userExists._id, res);

    res.status(200).json({ error: false, message: "Logged in successfully." });
  } catch (error) {
    res.status(500).json({ message: `Error login method: ${error.message}.` });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("accessToken");
    res.status(200).json({ error: false, message: "Logged out successfully." });
  } catch (error) {
    res.status(500).json({ message: `Error logout method: ${error.message}.` });
  }
};

export { register, login, logout };
