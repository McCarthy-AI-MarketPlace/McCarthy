import express from "express";
import {
  createTool,
  updateTool,
  deleteTool,
  getTools,
  getToolById,
  searchTools,
  getUserTools,
  getFeaturedTools,
  getEditorsChoiceTools,
  getLatestTools,
  getPopularTools,
  incrementSaves,
  getToolDetailsById,
  getToolPrivacyInfo,
  exploreTools,
  getToolsByTag,
  getToolsByUseCase,
  getAllTags,
  getAllUseCases,
} from "../controllers/tool.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// 🟢 Create, Update, Delete Tool
router.post("/", verifyJWT, createTool);
router.put("/:id", verifyJWT, updateTool);
router.delete("/:id", verifyJWT, deleteTool);

// 🟢 Basic Tool Access
router.get("/", getTools); // All tools
router.get("/search", searchTools); // Keyword search
router.get("/my-tools/:userId", getUserTools); // User's tools
router.get("/:id", getToolById); // Basic tool by ID

// 🔵 Extra Tool Info (Details, Privacy, Explore)
router.get("/details/:id", getToolDetailsById); // Full tool overview + useCases
router.get("/privacy/:id", getToolPrivacyInfo); // Data sharing/privacy info
router.get("/explore/all", exploreTools); // Smart filter/search

// 🔵 Categorized & Sorted Tools
router.get("/featured", getFeaturedTools);
router.get("/editors-choice", getEditorsChoiceTools);
router.get("/latest", getLatestTools);
router.get("/popular", getPopularTools);

// 🔵 Filter by Tags & Use Cases
router.get("/tag/:tag", getToolsByTag);
router.get("/use-case/:useCase", getToolsByUseCase);

// 🔵 All Metadata Lists
router.get("/all-tags/list", getAllTags);
router.get("/all-usecases/list", getAllUseCases);

// 🔵 Save Counter
router.patch("/:id/save", incrementSaves);

export default router;
