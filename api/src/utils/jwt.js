import jwt from "jsonwebtoken";

const createToken = (userId, res) => {
  const accessToken = jwt.sign(
    { userId },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 1 * 24 * 60 * 60 * 1000
  });
};

export { createToken };
