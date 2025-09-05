import { Router } from "express";
import { getSessionsController, getSessionController, deleteSessionController } from "../controllers/session.controller.js";

const router = Router();

router.get("/", getSessionsController);
router.get("/:sessionId", getSessionController);
router.delete("/:sessionId", deleteSessionController);



export default router;
