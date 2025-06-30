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
    let response;
    let aiMessage = "No response received.";

    const endpointLower = modelEndpoint.toLowerCase();

    if (endpointLower.includes("generativelanguage.googleapis.com")) {
      response = await axios.post(
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

      aiMessage = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || aiMessage;
    } else if (endpointLower.includes("groq.com")) {
      response = await axios.post(
        modelEndpoint,
        {
          model,
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      aiMessage = response.data?.choices?.[0]?.message?.content || aiMessage;
    } else {
      throw new ApiError(400, "Unsupported or unrecognized model endpoint");
    }

    res.status(200).json(
      new ApiResponse(200, { response: aiMessage }, "AI response received")
    );
  } catch (error) {
    console.error("AI API error:", error.response?.data || error.message);
    throw new ApiError(500, "Failed to get response from AI provider");
  }
});
