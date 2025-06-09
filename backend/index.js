import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

// Route imports
import userRoutes from "./routes/user.routes.js";
import toolRoutes from "./routes/tool.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import commentRoutes from "./routes/comment.routes.js";

// Config
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI;

// Convert ES Module to __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to MongoDB
(async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
})();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use("/api/user", userRoutes);
app.use("/api/tool", toolRoutes);
app.use("/api", uploadRoutes);
app.use("/api/comment", commentRoutes);

// Serve frontend build in production
app.use(express.static(path.join(__dirname, "frontend", "dist")));

// Handle React Router - serve index.html for all non-API routes
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
