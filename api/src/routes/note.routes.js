import express from "express";
import { addNote, editNote, pinNote } from "../controllers/note.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", verifyToken, addNote);

router.patch("/:id", verifyToken, editNote);

router.patch("/pin-note/:id", verifyToken, pinNote);

router.delete("/:id", verifyToken,);

export default router;
