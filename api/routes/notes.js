import express from "express";
import fetchuser from "../middleware/fetchuser.js";
import {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
  togglePin,
  searchNotes,
} from "../controllers/notes.js";

const router = express.Router();

// All routes are prefixed with /api/v1/notes in index.js
router.get("/", fetchuser, getNotes);
router.get("/search", fetchuser, searchNotes);
router.get("/:id", fetchuser, getNote);
router.post("/", fetchuser, createNote);
router.put("/:id", fetchuser, updateNote);
router.delete("/:id", fetchuser, deleteNote);
router.patch("/:id/pin", fetchuser, togglePin);

export default router;
