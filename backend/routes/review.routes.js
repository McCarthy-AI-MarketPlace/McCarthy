import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addToolReview } from "../controllers/review.controller.js";
import { deleteToolReview } from "../controllers/review.controller.js";

const router = Router();

router.post('/:toolId', verifyJWT, addToolReview);
router.delete('/:toolId', verifyJWT, deleteToolReview);

export default router;