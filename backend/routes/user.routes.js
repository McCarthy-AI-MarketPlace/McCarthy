import { Router } from "express";
import { signup, login, signout, updateUser, deleteUser,getUserProfile, addToFavorites, removeFromFavorites, getFavorites} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { google } from "../controllers/user.controller.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post('/google', google);

// secure routes
router.post("/logout", signout);
router.put("/update", verifyJWT, updateUser);
router.delete("/delete", verifyJWT, deleteUser);
router.get("/profile", verifyJWT,getUserProfile );
router.post("/addFavorite", verifyJWT, addToFavorites);
router.delete("/removeFavorite", verifyJWT, removeFromFavorites);
router.get("/favorites", verifyJWT, getFavorites);

export default router;