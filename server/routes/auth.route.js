import express from "express";
import { loginUser } from "../controllers/auth.controllers";
import { registerUser } from "../controllers/auth.controllers.controllers";

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", checkAuth, async (req, res) => {
  console.log("hit on profile route");
  res.status(200).json({ message: "Profile route hit" });
});

export default router;
