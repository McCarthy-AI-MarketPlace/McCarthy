import Tool from "../models/tool.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

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

export const getTools = asyncHandler(async (req, res) => {
  const tools = await Tool.find().populate("user", "fullName email");
  res.status(200).json(new ApiResponse(200, tools));
});

export const getToolById = asyncHandler(async (req, res) => {
  const tool = await Tool.findById(req.params.id);
  if (!tool)
    return res.status(404).json(new ApiResponse(404, "Tool not found"));

  res.status(200).json(new ApiResponse(200, tool));
});

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

export const getUserTools = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  if (!userId) throw new ApiError(400, "User ID is required");

  const tools = await Tool.find({ user: userId }).populate(
    "user",
    "fullName email"
  );
  res.status(200).json(new ApiResponse(200, tools));
});

export const getFeaturedTools = asyncHandler(async (req, res) => {
  const tools = await Tool.find({ isFeatured: true });
  res.status(200).json(new ApiResponse(200, tools));
});

export const getEditorsChoiceTools = asyncHandler(async (req, res) => {
  const tools = await Tool.find({ isEditorsChoice: true });
  res.status(200).json(new ApiResponse(200, tools));
});

export const incrementSaves = asyncHandler(async (req, res) => {
  const tool = await Tool.findById(req.params.id);
  if (!tool)
    return res.status(404).json(new ApiResponse(404, "Tool not found"));

  tool.saves += 1;
  await tool.save();

  res.status(200).json(new ApiResponse(200, "Saves count incremented", tool));
});

export const getLatestTools = asyncHandler(async (req, res) => {
  const tools = await Tool.find().sort({ createdAt: -1 }).limit(10);
  res.status(200).json(new ApiResponse(200, tools));
});

export const getPopularTools = asyncHandler(async (req, res) => {
  const tools = await Tool.find().sort({ saves: -1 }).limit(10);
  res.status(200).json(new ApiResponse(200, tools));
});

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

export const getToolsByTag = asyncHandler(async (req, res) => {
  const tag = req.params.tag;
  const tools = await Tool.find({ tags: { $in: [tag] } });
  res.status(200).json(new ApiResponse(200, tools));
});

export const getToolsByUseCase = asyncHandler(async (req, res) => {
  const useCase = req.params.useCase;
  const tools = await Tool.find({ useCases: { $in: [useCase] } });
  res.status(200).json(new ApiResponse(200, tools));
});

export const getAllTags = asyncHandler(async (req, res) => {
  const tools = await Tool.find({}, "tags");
  const allTags = [...new Set(tools.flatMap((tool) => tool.tags || []))];
  res.status(200).json(new ApiResponse(200, allTags));
});

export const getAllUseCases = asyncHandler(async (req, res) => {
  const tools = await Tool.find({}, "useCases");
  const allUseCases = [
    ...new Set(tools.flatMap((tool) => tool.useCases || [])),
  ];
  res.status(200).json(new ApiResponse(200, allUseCases));
});

export const getToolPrivacyInfo = asyncHandler(async (req, res) => {
  const tool = await Tool.findById(req.params.id, "dataSharing");
  if (!tool)
    return res.status(404).json(new ApiResponse(404, "Tool not found"));
  res.status(200).json(new ApiResponse(200, tool.dataSharing));
});

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
