import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import userRoutes from "./routes/user.routes.js";
import toolRoutes from "./routes/tool.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import reviewRoutes from "./routes/review.routes.js";

dotenv.config();
const mongoURI = process.env.MONGO_URI;

(async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
})();

const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.use(cors());
app.use(express.static("public"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);
app.use("/api/tool", toolRoutes);
app.use("/api", uploadRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/chat", chatRoutes );
app.use("/api/review", reviewRoutes );

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "frontend", "dist")));

app.get("/{*any}", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});