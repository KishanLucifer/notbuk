import mongoose from "mongoose";

// Define the Notes schema with timestamps
const NotesSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      default: "General",
    },
  },
  {
    timestamps: true, // This adds createdAt and updatedAt fields
  }
);

// Create the model
const notes = mongoose.model("notes", NotesSchema);

export default notes;
