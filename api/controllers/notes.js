import express from "express";
import mongoose from "mongoose";
import Note from "../Schema/Note.js";

const router = express.Router();

// 1 Get all the notes by spacific user

export const getNotes = async (req, res) => {
  try {
    const note = await Note.find({ user: req.user.id });

    res.status(200).json(note);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// 2 Get all the notes by id of spacific user

export const getNote = async (req, res) => {
  try {
    const note = await Note.findById(id);

    res.status(200).json(note);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// 3 Add  new note

export const createNote = async (req, res) => {
  const { title, description, tag } = req.body;

  const newnotes = new Note({
    title,
    description,
    tag,
    user: req.user.id,
  });

  try {
    await newnotes.save();

    res.status(201).json(newnotes);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// 4 Edit the note

export const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, description, tag } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No note with id: ${id}`);

  const updatedNote = { title, description, tag, _id: id };

  await Note.findByIdAndUpdate(id, updatedNote, { new: true });

  res.json(updatedNote);
};

// 5 Delete the note

export const deleteNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No note with id: ${id}`);

  await notes.findByIdAndDelete(id);

  res.json({ message: "Note deleted successfully." });
};

export default router;
