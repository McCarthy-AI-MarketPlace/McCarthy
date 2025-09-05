import Session from "../models/session.model.js";
import { User } from "../models/user.model.js";
import Tool from "../models/tool.model.js";


export const createSession = async (userId, toolId, title ) => {
  try {
    const user = await User.findById(userId);
    const tool = await Tool.findById(toolId);
    if (!user || !tool) {
      throw new ApiError(404, "User or Tool not found");
    }
    const session = new Session({
      userId,
      toolId,
      title,
    });
    await session.save();
    return session;
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

export const getSession = async (sessionId) => {
  try {
    const session = await Session.findById(sessionId).populate("messages");
    if (!session) {
      throw new ApiError(404, "Session not found");
    }
    return session;
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

export const getSessions = async (userId) => {
  try {
    const sessions = await Session.find({ userId })
      .select('-messages -userId')
      .populate('toolId', 'title image _id')
    return sessions;
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

export const deleteSession = async (sessionId, userId) => {
  try {
    const session = await Session.findById(sessionId);
    if (!session) {
      throw new ApiError(404, "Session not found");
    }
    if (session.userId.toString() !== userId) {
      throw new ApiError(403, "Not authorized");
    }
    await session.deleteOne();
    return session;
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};