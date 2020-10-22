import {IItem} from "../models/Item";
import { IQueryOptions } from "../../services/queryOptions";

export interface IItemsRepository {
  get: (queryOptions?: IQueryOptions) => Promise<IItem[] | Error>;
  getById: (id: string) => Promise<IItem | Error>;
  add: (item: IItem) => Promise<string | Error>;
  update: (item: IItem) => Promise<IItem | Error>;
  delete: (id: string) => Promise<boolean | Error>;
}
