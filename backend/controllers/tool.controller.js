import Tool from "../models/tool.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// 🟢 Create Tool
export const createTool = asyncHandler(async (req, res) => {
  const currentUser = req.user;
  if (!currentUser || !currentUser.isAdmin) {
    return res
      .status(403)
      .json(new ApiError(403, "Only admin users can publish tools"));
  }

  const newTool = new Tool({ ...req.body, user: currentUser._id });
  await newTool.save();

  res
    .status(201)
    .json(new ApiResponse(201, "Tool created successfully", newTool));
});

// 🟢 Update Tool
export const updateTool = asyncHandler(async (req, res) => {
  const tool = await Tool.findById(req.params.id);
  if (!tool) return res.status(404).json(new ApiError(404, "Tool not found"));

  if (
    tool.user.toString() !== req.user._id.toString() &&
    !req.user.isSuperAdmin
  ) {
    return res.status(403).json(new ApiError(403, "Unauthorized"));
  }

  const updatedTool = await Tool.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(new ApiResponse(200, updatedTool));
});

// 🟢 Delete Tool
export const deleteTool = asyncHandler(async (req, res) => {
  const tool = await Tool.findById(req.params.id);
  if (!tool)
    return res.status(404).json(new ApiResponse(404, "Tool not found"));

  if (
    tool.user.toString() !== req.user._id.toString() &&
    !req.user.isSuperAdmin
  ) {
    return res.status(403).json(new ApiError(403, "Unauthorized"));
  }

  await Tool.findByIdAndDelete(req.params.id);
  res.status(200).json(new ApiResponse(200, "Tool deleted successfully"));
});

// 🟢 Get All Tools
export const getTools = asyncHandler(async (req, res) => {
  const tools = await Tool.find().populate("user", "fullName email");
  res.status(200).json(new ApiResponse(200, tools));
});

// 🟢 Get Tool by ID
export const getToolById = asyncHandler(async (req, res) => {
  const tool = await Tool.findById(req.params.id);
  if (!tool)
    return res.status(404).json(new ApiResponse(404, "Tool not found"));

  res.status(200).json(new ApiResponse(200, tool));
});

// 🔵 Get Full Tool Details (Overview, UseCases, DataSharing, etc.)
export const getToolDetailsById = asyncHandler(async (req, res) => {
  const tool = await Tool.findById(req.params.id).populate(
    "user",
    "fullName email"
  );

  if (!tool) {
    return res.status(404).json(new ApiResponse(404, "Tool not found"));
  }

  const response = {
    title: tool.title,
    subtitle: tool.subtitle,
    image: tool.image,
    overview: tool.overview,
    useCases: tool.useCases,
    rating: tool.rating,
    toolUrl: tool.toolUrl,
    categoryTags: tool.tags,
    dataSharing: tool.dataSharing,
    addedBy: {
      name: tool.user.fullName,
      email: tool.user.email,
    },
    createdAt: tool.createdAt,
  };

  res.status(200).json(new ApiResponse(200, response));
});

// 🟢 Get Tools by User
export const getUserTools = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  if (!userId) throw new ApiError(400, "User ID is required");

  const tools = await Tool.find({ user: userId }).populate(
    "user",
    "fullName email"
  );
  res.status(200).json(new ApiResponse(200, tools));
});

// 🔵 Get Featured Tools
export const getFeaturedTools = asyncHandler(async (req, res) => {
  const tools = await Tool.find({ isFeatured: true });
  res.status(200).json(new ApiResponse(200, tools));
});

// 🔵 Get Editors' Choice Tools
export const getEditorsChoiceTools = asyncHandler(async (req, res) => {
  const tools = await Tool.find({ isEditorsChoice: true });
  res.status(200).json(new ApiResponse(200, tools));
});

// 🔵 Increment Saves
export const incrementSaves = asyncHandler(async (req, res) => {
  const tool = await Tool.findById(req.params.id);
  if (!tool)
    return res.status(404).json(new ApiResponse(404, "Tool not found"));

  tool.saves += 1;
  await tool.save();

  res.status(200).json(new ApiResponse(200, "Saves count incremented", tool));
});

// 🔵 Get Latest Tools
export const getLatestTools = asyncHandler(async (req, res) => {
  const tools = await Tool.find().sort({ createdAt: -1 }).limit(10);
  res.status(200).json(new ApiResponse(200, tools));
});

// 🔵 Get Popular Tools
export const getPopularTools = asyncHandler(async (req, res) => {
  const tools = await Tool.find().sort({ saves: -1 }).limit(10);
  res.status(200).json(new ApiResponse(200, tools));
});

// 🔍 Search Tools
export const searchTools = asyncHandler(async (req, res) => {
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
});

// 🔵 Get Tools by Tag
export const getToolsByTag = asyncHandler(async (req, res) => {
  const tag = req.params.tag;
  const tools = await Tool.find({ tags: { $in: [tag] } });
  res.status(200).json(new ApiResponse(200, tools));
});

// 🔵 Get Tools by UseCase
export const getToolsByUseCase = asyncHandler(async (req, res) => {
  const useCase = req.params.useCase;
  const tools = await Tool.find({ useCases: { $in: [useCase] } });
  res.status(200).json(new ApiResponse(200, tools));
});

// 🔵 Get All Unique Tags
export const getAllTags = asyncHandler(async (req, res) => {
  const tools = await Tool.find({}, "tags");
  const allTags = [...new Set(tools.flatMap((tool) => tool.tags || []))];
  res.status(200).json(new ApiResponse(200, allTags));
});

// 🔵 Get All Unique UseCases
export const getAllUseCases = asyncHandler(async (req, res) => {
  const tools = await Tool.find({}, "useCases");
  const allUseCases = [
    ...new Set(tools.flatMap((tool) => tool.useCases || [])),
  ];
  res.status(200).json(new ApiResponse(200, allUseCases));
});

// 🔵 Get Tool Privacy Info
export const getToolPrivacyInfo = asyncHandler(async (req, res) => {
  const tool = await Tool.findById(req.params.id, "dataSharing");
  if (!tool)
    return res.status(404).json(new ApiResponse(404, "Tool not found"));
  res.status(200).json(new ApiResponse(200, tool.dataSharing));
});

// 🔵 Explore Tools (Search, Filter, Sort Combined)
export const exploreTools = asyncHandler(async (req, res) => {
  const { q, tag, useCase, sortBy } = req.query;
  let query = {};

  if (q) {
    const regex = new RegExp(q, "i");
    query.$or = [
      { title: regex },
      { description: regex },
      { hashtags: { $in: [regex] } },
      { keyWords: { $in: [regex] } },
    ];
  }

  if (tag) query.tags = { $in: [tag] };
  if (useCase) query.useCases = { $in: [useCase] };

  let sort = {};
  if (sortBy === "latest") sort = { createdAt: -1 };
  else if (sortBy === "popular") sort = { saves: -1 };
  else if (sortBy === "rating") sort = { rating: -1 };

  const tools = await Tool.find(query)
    .sort(sort)
    .populate("user", "fullName email");
  res.status(200).json(new ApiResponse(200, tools));
});
