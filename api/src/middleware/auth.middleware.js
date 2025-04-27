import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookie.jwt;
  
    if (!token) {
      return res.status(401).json({ message: "Token is not provided." });
    }
  
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  
    if (!decoded) {
      return res.status(401).json({ message: "Token is not valid." });
    }
  
    req.user = decoded;
    next();
  } catch (error) {
    res.status(500).json({ message: `Error verifyToken method: ${error.message}` });
  }
};

export { verifyToken };
