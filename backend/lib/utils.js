import jwt from "jsonwebtoken";

const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true, // prevent XSS attacks (Cross-Site Scripting attacks)
    sameSite: "strict", // Prevent CSRF attacks (Cross-Site Request Forgery attack)
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
};

export default generateToken;
