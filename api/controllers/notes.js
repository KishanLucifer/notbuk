import mongoose from "mongoose";
import Note from "../Schema/Note.js";

// 1. Get all notes (with pagination, sorting pinned first)
export const getNotes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    const [notes, total] = await Promise.all([
      Note.find({ user: req.user.id })
        .sort({ isPinned: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Note.countDocuments({ user: req.user.id }),
    ]);

    return res.status(200).json({
      success: true,
      notes,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to fetch notes",
    });
  }
};

// 2. Get single note by ID
export const getNote = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid note ID",
      });
    }

    const note = await Note.findOne({ _id: id, user: req.user.id }).lean();
    if (!note) {
      return res.status(404).json({
        success: false,
        error: "Note not found",
      });
    }

    return res.status(200).json({ success: true, note });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to fetch note",
    });
  }
};

// 3. Create note
export const createNote = async (req, res) => {
  try {
    const { title, description, tag, color, priority } = req.body;

    if (!title || title.trim().length < 1) {
      return res.status(400).json({
        success: false,
        error: "Title is required",
      });
    }
    if (!description || description.trim().length < 1) {
      return res.status(400).json({
        success: false,
        error: "Description is required",
      });
    }

    const newNote = new Note({
      title: title.trim(),
      description: description.trim(),
      tag: tag?.trim() || "General",
      color: color || "default",
      priority: priority || "low",
      user: req.user.id,
    });

    await newNote.save();
    return res.status(201).json({ success: true, note: newNote });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to create note",
    });
  }
};

// 4. Update note
export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid note ID",
      });
    }

    // Verify ownership
    const existingNote = await Note.findOne({ _id: id, user: req.user.id });
    if (!existingNote) {
      return res.status(404).json({
        success: false,
        error: "Note not found or access denied",
      });
    }

    const { title, description, tag, color, priority } = req.body;

    if (title !== undefined) existingNote.title = title.trim();
    if (description !== undefined) existingNote.description = description.trim();
    if (tag !== undefined) existingNote.tag = tag.trim();
    if (color !== undefined) existingNote.color = color;
    if (priority !== undefined) existingNote.priority = priority;

    await existingNote.save();

    return res.status(200).json({ success: true, note: existingNote });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to update note",
    });
  }
};

// 5. Delete note
export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid note ID",
      });
    }

    const note = await Note.findOneAndDelete({ _id: id, user: req.user.id });
    if (!note) {
      return res.status(404).json({
        success: false,
        error: "Note not found or access denied",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to delete note",
    });
  }
};

// 6. Toggle pin
export const togglePin = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid note ID",
      });
    }

    const note = await Note.findOne({ _id: id, user: req.user.id });
    if (!note) {
      return res.status(404).json({
        success: false,
        error: "Note not found or access denied",
      });
    }

    note.isPinned = !note.isPinned;
    await note.save();

    return res.status(200).json({
      success: true,
      note,
      message: note.isPinned ? "Note pinned" : "Note unpinned",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to toggle pin",
    });
  }
};

// 7. Search notes
export const searchNotes = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: "Search query is required",
      });
    }

    const searchRegex = new RegExp(q.trim(), "i");

    const notes = await Note.find({
      user: req.user.id,
      $or: [
        { title: searchRegex },
        { description: searchRegex },
        { tag: searchRegex },
      ],
    })
      .sort({ isPinned: -1, createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      notes,
      count: notes.length,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Search failed",
    });
  }
};
