import express from "express";
import { addNote, deleteNote, editNote, getAllNotes, pinNote } from "../controllers/note.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(verifyToken);

router.get("/", getAllNotes);

router.post("/", addNote);

router.patch("/:id", editNote);

router.patch("/pin-note/:id", pinNote);

router.delete("/:id", deleteNote);

export default router;
