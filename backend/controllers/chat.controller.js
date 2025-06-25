import axios from "axios";
import Tool from "../models/tool.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const chatWithAI = asyncHandler(async (req, res) => {
  const { prompt, toolId } = req.body;
  if (!prompt || !toolId) {
    throw new ApiError(400, "Prompt and toolId are required");
  }

  const tool = await Tool.findById(toolId);
  if (!tool) {
    throw new ApiError(404, "Tool not found");
  }

  const { apiKey, modelEndpoint, model } = tool;
  if (!apiKey || !modelEndpoint || !model) {
    throw new ApiError(500, "Incomplete tool configuration");
  }

  try {
    const response = await axios.post(
      `${modelEndpoint}?key=${apiKey}`, 
      {
        model: model,
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const aiMessage = response.data?.candidates?.[0]?.content || "No response received.";

    res.status(200).json(
      new ApiResponse(
        200,
        { response: aiMessage },
        "AI response received"
      )
    );
  } catch (error) {
    console.error("Gemini API error:", error.response?.data || error.message);
    throw new ApiError(500, "Failed to get response from Gemini AI");
  }
});
