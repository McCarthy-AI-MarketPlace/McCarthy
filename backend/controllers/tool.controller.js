import Tool from "../models/tool.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createTool = asyncHandler(async (req, res) => {
  try {
    const currentUser = req.user;

    if (!currentUser || !currentUser.isAdmin) {
      return res
        .status(403)
        .json(new ApiError(403, "Only admin users can publish tools"));
    }

    const newTool = new Tool({
      ...req.body,
      user: currentUser._id,
    });

    await newTool.save();

    res
      .status(201)
      .json(new ApiResponse(201, "Tool created successfully", newTool));
  } catch (error) {
    res.status(500).json(new ApiError(500, "Internal Server Error"));
  }
});

export const updateTool = asyncHandler(async (req, res) => {
  try {
    const tool = await Tool.findById(req.params.id);
    if (!tool) return res.status(404).json(new ApiError(404, "Tool not found"));
    if (tool.user.toString() !== req.user._id.toString()) {
      return res.status(403).json(new ApiError(403, "Unauthorized"));
    }

    const updatedTool = await Tool.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(new ApiResponse(200, updatedTool));
  } catch (error) {
    res.status(500).json(new ApiError(500, "Internal Server Error"));
  }
});

export const deleteTool = asyncHandler(async (req, res) => {
  try {
    const tool = await Tool.findById(req.params.id);

    if (!tool)
      return res.status(404).json(new ApiResponse(404, "Tool not found"));

    if (tool.user.toString() !== req.user._id.toString()) {
      return res.status(403).json(new ApiError(403, "Unauthorized"));
    }

    await Tool.findByIdAndDelete(req.params.id);

    res.status(200).json(new ApiResponse(200, "Tool deleted successfully"));
  } catch (error) {
    console.error("Error deleting tool:", error);
    res.status(500).json(new ApiError(500, "Internal Server Error"));
  }
});

export const getTools = asyncHandler(async (req, res) => {
  try {
    const tools = await Tool.find().populate("user", "name email");
    res.status(200).json(new ApiResponse(200, tools));
  } catch (error) {
    res.status(500).json(new ApiError(500, "Internal Server Error"));
  }
});

export const searchTools = asyncHandler(async (req, res) => {
  try {
    const query = req.query.q;
    const regex = new RegExp(query, "i");
    const tools = await Tool.find({
      $or: [
        { title: regex },
        { description: regex },
        { hashtags: { $in: [regex] } },
        { keyWords: { $in: [regex] } },
      ],
    });
    res.status(200).json(new ApiResponse(200, tools));
  } catch (error) {
    res.status(500).json(new ApiError(500, "Internal Server Error"));
  }
});

export const getToolById = asyncHandler(async (req, res) => {
  try {
    const tool = await Tool.findById(req.params.id);
    if (!tool)
      return res.status(404).json(new ApiResponse(404, "Tool not found"));
    res.status(200).json(new ApiResponse(200, tool));
  } catch (err) {
    res.status(500).json(new ApiError(500, "Internal Server Error"));
  }
});

export const getUserTools = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      throw new ApiError(400, "User ID is required");
    }

    const tools = await Tool.find({ user: userId }).populate(
      "user",
      "fullName email"
    );

    res.status(200).json(new ApiResponse(200, tools));
  } catch (error) {
    res.status(500).json(new ApiError(500, "Internal Server Error"));
  }
});
