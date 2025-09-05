import mongoose from "mongoose";

export const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["user", "assistant"],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  files: {
    type: [String],
    default: [],
  },
  feedback: {
    type: String,
    enum: ["like", "dislike", "neutral"],
    default: "neutral",
  },
});

export const Message = mongoose.model("Message", messageSchema);