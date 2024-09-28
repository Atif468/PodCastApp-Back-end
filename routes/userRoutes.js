// routes/userRoutes.js
import express from "express";
import { SignUp, Login, GetUserInfo } from "../controllers/userControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", SignUp);

router.post("/login", Login);

router.get("/userinfo", authMiddleware, GetUserInfo);

export default router;
