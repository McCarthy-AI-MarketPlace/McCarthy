import Comment from "../models/comment.model.js";
import Tool from "../models/tool.model.js";

export const createComment = async (req, res) => {
  try {
    const { toolId } = req.params;
    const { content, parentComment } = req.body;
    const userId = req.user._id;

    const tool = await Tool.findById(toolId);
    if (!tool) return res.status(404).json({ message: "Tool not found" });

    const comment = await Comment.create({
      content,
      tool: toolId,
      user: userId,
      parentComment: parentComment || null,
    });

    const populatedComment = await comment.populate("user", "username email");

    res.status(201).json({ success: true, comment: populatedComment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCommentsByTool = async (req, res) => {
  try {
    const { toolId } = req.params;

    const comments = await Comment.find({ tool: toolId })
      .populate("user", "username email")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, comments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user._id;

    const comment = await Comment.findById(commentId);

    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await comment.deleteOne();

    res.status(200).json({ success: true, message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
