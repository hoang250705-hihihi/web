import jwt from "jsonwebtoken";

const SECRET_KEY = "JWT_SECRET_KEY"; // 👈 GIỐNG HỆT auth.service.js

export const authView = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    res.locals.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.locals.user = decoded;
  } catch (err) {
    res.locals.user = null;
  }

  next();
};
