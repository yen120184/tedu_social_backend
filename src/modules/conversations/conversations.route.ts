import { Route } from "@core/interfaces";
import { authMiddleware } from "@core/middleware";
import validationMiddleware from "@core/middleware/validation.middleware";
import { Router } from "express";
import ConversationsController from "./conversations.controller";
import SendMessageDto from "./dtos/send_message.dto";

export default class ConversationsRoute implements Route {
  public path = "/api/v1/conversations";
  public router = Router();

  public conversationsController = new ConversationsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      this.path,
      authMiddleware,
      validationMiddleware(SendMessageDto, true),
      this.conversationsController.sendMessage
    ); //POST: http://localhost:5000/api/v1/conversations
  }
}
