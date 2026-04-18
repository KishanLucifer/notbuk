import mongoose from "mongoose";

const NotesSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [5000, "Description cannot exceed 5000 characters"],
    },
    tag: {
      type: String,
      default: "General",
      trim: true,
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      enum: ["default", "red", "orange", "yellow", "green", "blue", "purple"],
      default: "default",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },
  },
  {
    timestamps: true,
  }
);

// Text index for search functionality
NotesSchema.index({ title: "text", description: "text", tag: "text" });

// Compound index for user queries with sorting
NotesSchema.index({ user: 1, isPinned: -1, createdAt: -1 });

const Note = mongoose.model("notes", NotesSchema);

export default Note;
