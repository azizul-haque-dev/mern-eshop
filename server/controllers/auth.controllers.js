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

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatched = await user.isPasswordCorrect(password);
    if (!isMatched) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000
    });

    return res.status(200).json({
      message: "Login successful",
      token
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// get user profile
const getUserProfile = async (req, res) => {
  console.log(req.user);
  try {
    const user = await UserModel.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export { getUserProfile, loginUser, registerUser };
