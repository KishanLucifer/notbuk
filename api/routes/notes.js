import express from "express";

import {
  getNotes,
  getNote,
  createNote,
  updateNote,
  // likeNote,
  deleteNote,
} from "../controllers/notes.js";
import fetchuser from "../middleware/fetchuser.js";

const router = express.Router();

router.get("/", fetchuser, getNotes);
router.post("/", fetchuser, createNote);
router.get("/:id", fetchuser, getNote);
router.patch("/:id", fetchuser, updateNote);
router.delete("/:id", fetchuser, deleteNote);
// router.patch("/:id/likeNote", likeNote);

export default router;
