// models/comment.model.js
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    tool: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tool",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment", // for threaded replies
      default: null,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
