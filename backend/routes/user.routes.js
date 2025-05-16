import { Router } from "express";
import { signup, login, signout, updateUser, deleteUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);

// secure routes
router.post("/signout", verifyJWT, signout);
router.put("/update", verifyJWT, updateUser);
router.delete("/delete", verifyJWT, deleteUser);

export default router;