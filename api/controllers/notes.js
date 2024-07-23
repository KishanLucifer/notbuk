import express from "express";
import mongoose from "mongoose";
import notes from "../Schema/Note.js";

const router = express.Router();

// 1 Get all the post by spacific user

export const getNotes = async (req, res) => {
  try {
    const postMessages = await notes.find({ user: req.user.id });

    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// 2 Get all the post by id of  spacific post

export const getNote = async (req, res) => {
  try {
    const post = await notes.findById(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// 3 Add  new post

export const createNote = async (req, res) => {
  const { title, description, tag } = req.body;

  const newnotes = new notes({
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

// 4 Edit the post

export const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, description, tag } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = { title, description, tag, _id: id };

  await notes.findByIdAndUpdate(id, updatedPost, { new: true });

  res.json(updatedPost);
};

// 5 Delete the post

export const deleteNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await notes.findByIdAndDelete(id);

  res.json({ message: "Post deleted successfully." });
};

export default router;
