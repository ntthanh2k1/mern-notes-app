import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { isValidEmail } from "../utils/helper.js";
import { createToken } from "../utils/jwt.js";

const register = async (req, res, next) => {
  try {
    const { name, email, username, password } = req.body;

    if (!name) {
      return res.status(400).json({ error: true, message: "Name required." });
    }

    if (!email) {
      return res.status(400).json({ error: true, message: "Email required." });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: true, message: "Email's format not valid." });
    }

    if (!username) {
      return res.status(400).json({ error: true, message: "Username required." });
    }

    if (!password) {
      return res.status(400).json({ error: true, message: "Password required." });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: true, message: "Password must be at least 6 characters." });
    }

    const currentUser  = await User.findOne({ username });

    if (currentUser) {
      return res.status(400).json({ error: true, message: `Username ${username} already exists.` });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name: name,
      email: email,
      username: username,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ error: false, message: "Registered successfully." });
  } catch (error) {
    error.methodName = register.name;
    next(error);
  }
}

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username) {
      return res.status(400).json({ error: true, message: "Username required." });
    }

    const currentUser = await User.findOne({ username });

    if (!currentUser) {
      return res.status(404).json({ error: true, message: `Username ${username} not found.` });
    }

    if (!password) {
      return res.status(400).json({ error: true, message: "Password required." });
    }

    const isCorrectPassword = await bcrypt.compare(password, currentUser.password);

    if (!isCorrectPassword) {
      return res.status(400).json({ error: true, message: "Password not correct." });
    }

    createToken(currentUser._id, res);

    res.status(200).json({
      error: false,
      message: "Logged in successfully.",
      data: {
        name: currentUser.name,
        username: currentUser.username
      }
    });
  } catch (error) {
    error.methodName = login.name;
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    res.clearCookie("accessToken");
    res.status(200).json({ error: false, message: "Logged out successfully." });
  } catch (error) {
    error.methodName = logout.name;
    next(error);
  }
};

const getAuthUser = async (req, res, next) => {
  try {
    res.status(200).json({ error: false, data: req.user });
  } catch (error) {
    error.methodName = getAuthUser.name;
    next(error);
  }
};

export { register, login, logout, getAuthUser };
