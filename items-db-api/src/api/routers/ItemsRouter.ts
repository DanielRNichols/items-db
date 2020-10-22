import { BaseRouter } from "./BaseRouter";
import {IApiController} from "../controllers/IApiController";

export class ItemsRouter extends BaseRouter {

  constructor(controller: IApiController) {
    super("/api/items", controller);
  }

}
