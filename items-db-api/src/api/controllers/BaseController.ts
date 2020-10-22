import {Request, Response, NextFunction} from "express";
import {IApiController} from "./IApiController";
import {ApiError} from "../ApiError";
import { IApiRepository, IRepositoryItem } from "../repositories/IApiRepository";
import {QueryOptions} from "../../services/queryOptions";
import { SocketService } from "../../services/socketService";

export abstract class BaseController implements IApiController {

  public resourceName: string = "";
  private _repository: IApiRepository;
  private _socketService: SocketService;

  constructor(resourceName: string, repository: IApiRepository, socketService: SocketService) {
    this.resourceName = resourceName;
    this._repository = repository;
    this._socketService = socketService;
  }

  public abstract getRepositoryItemFromBody(body: any): IRepositoryItem;

  public async get(req: Request, res: Response, next: NextFunction): Promise<Response | void> {

    try {
      const queryOptions = QueryOptions.getOptions(req.query);
      const result = await this._repository.get(queryOptions);
      if (result instanceof Error) {
        return next (new ApiError(400, result.message));
      }
      return res.status(200).json(result);
    } catch (err) {
      return next (new ApiError(500, err.message));
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const id = req.params.id;
      const result = await this._repository.getById(id);
      if (result instanceof Error) {
        return next (new ApiError(404, result.message));
      }
      return res.status(200).json(result);
    } catch (err) {
      return next (new ApiError(500, err.message));
    }
  }

  public async add(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      if (!req.body) {
        return next (new ApiError(400, `Request has no body`));
      }
      const item: IRepositoryItem = this.getRepositoryItemFromBody(req.body);
      item.id = "";
      const result = await this._repository.add(item);
      if (result instanceof Error) {
        return next (new ApiError(400, result.message));
      }
      this._socketService.emitMessage("DbUpdated", `Item ${result} was added`);
      return res.status(201).json(result);
    } catch (err) {
      return next (new ApiError(500, err.message));
    }
  }

  public async update(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      if (!req.body) {
        return next (new ApiError(400, `Request has no body`));
      }
      const item: IRepositoryItem = this.getRepositoryItemFromBody(req.body);
      item.id = req.params.id;
      const result = await this._repository.update(item);
      if (result instanceof Error) {
        return next (new ApiError(400, result.message));
      }
      this._socketService.emitMessage("DbUpdated", `Item ${result.id} was updated`);
      return res.status(201).json(result);
    } catch (err) {
      return next (new ApiError(500, err.message));
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const id = req.params.id;
      const result = await this._repository.delete(id);
      if (result instanceof Error) {
        return next (new ApiError(400, result.message));
      }
      this._socketService.emitMessage("DbUpdated", `Item ${id} was deleted`);
      return res.status(200).json(result);
    } catch (err) {
      return next (new ApiError(500, err.message));
    }
  }

}
