import express from "express";
import { getAuthUser, login, logout, register } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.get("/get-auth-user", verifyToken, getAuthUser);

export default router;
