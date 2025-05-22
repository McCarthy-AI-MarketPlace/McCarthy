import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { uploadImageController } from "../controllers/upload.controller.js";

const router = express.Router();

router.post("/upload", upload.single("image"), uploadImageController);

export default router;
