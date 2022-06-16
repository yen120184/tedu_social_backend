import { NextFunction, Request, Response } from "express";
import CreateGroupDto from "./dtos/create_group.dto";
import GroupService from "./groups.service";

export default class GroupsController {
  private groupService = new GroupService();

  public createGroup = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const model: CreateGroupDto = req.body;
      const result = await this.groupService.createGroup(req.user.id, model);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  public updateGroup = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const model: CreateGroupDto = req.body;
      const groupId = req.params.id;
      const result = await this.groupService.updateGroup(groupId, model);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const groups = await this.groupService.getAllGroup();
      res.status(200).json(groups);
    } catch (error) {
      next(error);
    }
  };

  public deleteGroup = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const groupId = req.params.id;
      const groups = await this.groupService.deleteGroup(groupId);
      res.status(200).json(groups);
    } catch (error) {
      next(error);
    }
  };
}
