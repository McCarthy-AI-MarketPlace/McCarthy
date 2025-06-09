import express from "express";
import {
  createComment,
  getCommentsByTool,
  deleteComment,
} from "../controllers/comment.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// ✅ POST /api/comment/tool/:toolId
router.post("/tool/:toolId", verifyJWT, createComment);

// ✅ GET /api/comment/tool/:toolId
router.get("/tool/:toolId", getCommentsByTool);

// ✅ DELETE /api/comment/:commentId
router.delete("/:commentId", verifyJWT, deleteComment);

export default router;
