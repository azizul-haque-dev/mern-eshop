import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

export const authMiddleware = async (req, res, next) => {
  try {
    // get token
    const authHeader = req.headers.authorization?.trim();

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Wrong token or No token provided" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserModel.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // attach user info
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth error:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }

    return res.status(403).json({ message: "Invalid token" });
  }
};

export const checkAuth = (req, res, next) => {
  console.log(req.cookies, "middleware");
  next();
};
