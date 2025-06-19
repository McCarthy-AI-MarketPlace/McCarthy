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

router.post("/", verifyJWT, createTool);
router.put("/:id", verifyJWT, updateTool);
router.delete("/:id", verifyJWT, deleteTool);

router.get("/", getTools); 
router.get("/search", searchTools); 

router.get("/featured", getFeaturedTools);
router.get("/editors-choice", getEditorsChoiceTools);
router.get("/latest", getLatestTools);
router.get("/popular", getPopularTools);
router.get("/explore/all", exploreTools); 
router.get("/all-tags/list", getAllTags);
router.get("/all-usecases/list", getAllUseCases);

router.get("/my-tools/:userId", getUserTools); 
router.get("/details/:id", getToolDetailsById); 
router.get("/privacy/:id", getToolPrivacyInfo); 
router.get("/tag/:tag", getToolsByTag);
router.get("/use-case/:useCase", getToolsByUseCase);

router.patch("/:id/save", incrementSaves);

router.get("/:id", getToolById); 

export default router;
