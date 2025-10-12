import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

// register a new users
const registerUser = async (req, res) => {
  const {
    email,
    password,
    username,
    role,
    name,
    address = [],
    imageInfo
  } = req.body;
  const user = await UserModel.isEmailTaken(email);
  if (user) {
    return res.status(400).json({ message: "Email already taken" });
  }
  try {
    const newUser = new UserModel({
      email,
      password,
      role,
      name,
      username,
      imageInfo
    });
    await newUser.save();
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // check password
    const isMatched = await user.isPasswordCorrect(password);
    if (!isMatched) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // generate JWT token

    const token = jwt.sign(
      { email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "15min" }
    );

    return res.status(200).json({
      message: "Login successful",
      token
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
export { loginUser, registerUser };
