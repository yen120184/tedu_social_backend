import { Route } from "@core/interfaces";
import { authMiddleware } from "@core/middleware";
import { Router } from "express";
import AuthController from "./auth.controller";

export default class AuthRoute implements Route {
  public path = "/api/v1/auth";
  public router = Router();

  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path, this.authController.login);
    //POST: http://localhost:5000/api/auth
    this.router.get(
      this.path,
      authMiddleware,
      this.authController.getCurrentLoginUser
    );
    //GET: http://localhost:5000/api/auth --> Require login
  }
}
