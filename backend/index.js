import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import path from "path";
import mongoose from "mongoose";
import toolRoutes from "./routes/tool.routes.js";
import uploadRoutes from "./routes/upload.routes.js";

dotenv.config();

const mongoURI = process.env.MONGO_URI;
(async () => {
  try {
    await mongoose.connect(`${mongoURI}`);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
})();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
  })
);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});

app.use("/api/user", userRoutes);
app.use("/api/tool", toolRoutes);
app.use("/api", uploadRoutes);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "frontend", "dist")));

app.get("/{*any}", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});
