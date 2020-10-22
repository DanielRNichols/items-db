import {Request, Response, NextFunction} from "express";

export interface IApiController {
  get: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
  getById: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
  add: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
  update: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
  delete: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
}
