import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import express from "express";
import authRouter from "./routes/authRoute.js";
import connectDataBase from "./models/db.js";
import messageRouter from "./routes/messageRoute.js";
import cors from "cors";
import { app, server } from "./lib/socket.js";
import path from "path";

dotenv.config();

const PORT = process.env.PORT || 5002; // Default to 5002 if PORT is undefined

// Database connection
connectDataBase();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // Adjust as needed for your frontend
    credentials: true, // Allow credentials (cookies, authorization headers)
  })
);

// Routes
app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "..frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// Start server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
