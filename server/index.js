import dotenv from "dotenv";
import express from "express";

// config dotenv
dotenv.config("./.env");

const app = express();
const port = process.env.PORT || 8000;

// dummy route
app.get("/", (req, res) => {
  res.send("Hello World ");
});

// server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
