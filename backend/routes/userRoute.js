import express from "express";
import { getMe, getOtherUsers, login, logout, register } from "../controllers/userController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import upload from "../middleware/upload.js";
const router = express.Router();

router.post("/register", upload.single("profilePhoto"), register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/").get(isAuthenticated, getOtherUsers);
router.get("/me", isAuthenticated, getMe);

export default router;