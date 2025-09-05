import mongoose from "mongoose";
import { Message } from "./message.model.js";


export const sessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  toolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tool",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },

  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
});




const Session = mongoose.model("Session", sessionSchema);

export default Session;
