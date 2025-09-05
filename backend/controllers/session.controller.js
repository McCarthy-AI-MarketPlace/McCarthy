import Session from "../models/session.model.js";
import { getSession, getSessions, deleteSession } from "../services/session.services.js";



export const getSessionsController = async (req, res) => {
  try {
    const userId = req.headers['x-user-id'];
    const sessions = await getSessions(userId);
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSessionController = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const userId = req.headers['x-user-id'];
    const session = await getSession(sessionId, userId);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }
    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const deleteSessionController = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const userId = req.headers['x-user-id'];
    await deleteSession(sessionId, userId);
    res.status(200).json({ message: "Session deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};