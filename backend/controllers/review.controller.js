import Tool from '../models/tool.model.js';
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const addToolReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const { toolId } = req.params;

  const user = req.user;
    if (!user) {
        return res.status(401).json(new ApiError(401, 'User not authenticated'));
    }

  try {
    const tool = await Tool.findById(toolId);
    if (!tool) {
      return res.status(404).json(new ApiError(404,'Tool not found' ));
    }
    
    const alreadyReviewed = tool.reviews.find(
        (rev) => rev.user.toString() === user._id.toString()
    );
    
    if (alreadyReviewed) {
        return res.status(400).json(new ApiError(400, 'You have already reviewed this tool'));
    }

    const review = {
      user: user._id,
      name: user.fullName,
      rating: Number(rating),
      comment,
    };
    if (!review.rating || review.rating < 1 || review.rating > 5) {
      return res.status(400).json(new ApiError(400, 'Rating must be between 1 and 5'));
    }
    tool.reviews.push(review);
    

    tool.rating =
      tool.reviews.reduce((acc, r) => r.rating + acc, 0) / tool.reviews.length;

    await tool.save();

    res.status(201).json(new ApiResponse(201, tool,'Review added successfully'));
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json(new ApiError(500, 'Server error'));
  }
});

export const deleteToolReview = asyncHandler(async (req, res) => {
  const { toolId } = req.params;
  const user = req.user;
  
  if (!user) {
    return res.status(401).json(new ApiError(401, 'User not authenticated'));
  }

  try {
    const tool = await Tool.findById(toolId);
    if (!tool) {
      return res.status(404).json(new ApiError(404, 'Tool not found'));
    }

    const reviewIndex = tool.reviews.findIndex(
      (rev) => rev.user.toString() === user._id.toString()
    );
    
    if (reviewIndex === -1) {
      return res.status(404).json(new ApiError(404, 'Review not found or user not authorized to delete it'));
    }

    tool.reviews.splice(reviewIndex, 1);

    tool.rating = tool.reviews.length
      ? tool.reviews.reduce((acc, r) => acc + r.rating, 0) / tool.reviews.length
      : 4.8;

    await tool.save();

    res.status(200).json(new ApiResponse(200, tool, 'Review deleted successfully'));
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json(new ApiError(500, 'Server error'));
  }
});