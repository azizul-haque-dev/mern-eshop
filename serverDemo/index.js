import cookiePerser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDb } from "./db/index.js";
import authRouter from "./router/auth.route.js";

// config dotenv
dotenv.config("./.env");

const app = express();
const port = process.env.PORT || 8000;
// increase body size limit and  url encoded

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookiePerser());

// cors configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URI,
    credentials: true
  })
);

// routes
app.use("/api/auth", authRouter);

// api documents

// dummy route
app.get("/", (req, res) => {
  res.send("Hello World ");
});

// server
connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`✅ Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  });
