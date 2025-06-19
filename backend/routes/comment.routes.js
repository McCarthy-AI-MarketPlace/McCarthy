import express from "express";
import {
  createComment,
  getCommentsByTool,
  deleteComment,
} from "../controllers/comment.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/tool/:toolId", verifyJWT, createComment);

router.get("/tool/:toolId", getCommentsByTool);

router.delete("/:commentId", verifyJWT, deleteComment);

export default router;
