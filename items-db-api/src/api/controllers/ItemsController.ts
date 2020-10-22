import {BaseController} from "./BaseController";
import { IItemsRepository } from "../repositories/IItemsRepository";
import { IItem } from "../models/Item";
import { SocketService } from "../../services/socketService";

export class ItemsController extends BaseController {

  constructor(repository: IItemsRepository, socketService: SocketService) {
    super("items", repository, socketService);
  }

  public getRepositoryItemFromBody(body: any): IItem {
    const item: IItem = {
      id: body.id,
      className: body.className,
      tag: body.tag,
      description: body.description,
      properties: body.properties,
    };

    return item;

  }

}
