import {Router, Request, Response, NextFunction} from "express";
import { IApiRouter } from "./IApiRouter";

// ComponentsRouter is handling routes for /api/validatetoken
export class AuthRouter implements IApiRouter {

  public route: string = "/api/validatetoken";

  public routeHandler(): Router {

    const router = Router();

    router.get("/", async (req: Request, res: Response, next: NextFunction) => {
      // if it makes it this far, then token has already been validated by middleware
      return res.status(200).json({valid: true});
    });

    return router;
  }
}
