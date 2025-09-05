import { getSession } from "./session.services.js";
import { createSession } from "../services/session.services.js";
import Session from "../models/session.model.js";
import { Message } from "../models/message.model.js";

class ChatService {
  constructor(sessionID, userId, toolId, title) {
    this.sessionId = sessionID;
    this.session = null;
    this.messages = [];
    this.userId = userId;
    this.toolId = toolId;
    this.title = title;
  }
  async getChatHistory() {
    if (!this.session) {
      await this.getOrCreateSession();
      return [];
    }

    return await this.session.populate("messages").then(() => {
      return this.session.messages.map((message) => ({
        role: message.role,
        content: message.content,
      }));
    });
  }

  async addMessageToChatHistory(message) {
    if (!this.session) {
      await this.getOrCreateSession();
    }
    this.session.messages.push(Message(message));
    await this.session.save();
  }
  async getOrCreateSession() {
    if (!this.sessionId) {
      this.session = await createSession(this.userId, this.toolId, this.title);
      this.sessionId = this.session._id;
    } else {
      this.session = await Session.findById(this.sessionId);
    }
  }
}

export default ChatService;
