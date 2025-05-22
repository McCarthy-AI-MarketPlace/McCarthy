import express from "express";
import {
  createTool,
  updateTool,
  deleteTool,
  getTools,
  getToolById,
  searchTools,
  getUserTools, 
} from "../controllers/tool.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", verifyJWT, createTool);
router.put("/:id", verifyJWT, updateTool);
router.delete("/:id", verifyJWT, deleteTool);
router.get("/", getTools);
router.get("/search", searchTools);
router.get("/:id", getToolById);
router.get("/my-tools/:userId", getUserTools); 

export default router;