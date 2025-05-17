import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
  
    if (!token) {
      return res.status(401).json({ error: true, message: "Token not provided." });
    }
  
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  
    if (!decoded) {
      return res.status(401).json({ error: true, message: "Token not valid." });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: true, message: "User not found." });
    }
  
    req.user = user;
    next();
  } catch (error) {
    error.methodName = verifyToken.name;
    next(error);
  }
};

export { verifyToken };
