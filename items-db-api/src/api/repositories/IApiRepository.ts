import { IItem } from "../models/Item";
import { IQueryOptions } from "../../services/queryOptions";

export type IRepositoryItem = IItem;

export interface IApiRepository {
  get: (queryOptions?: IQueryOptions) => Promise<IRepositoryItem[] | Error>;
  getById: (id: string) => Promise<IRepositoryItem | Error>;
  add: (item: IRepositoryItem) => Promise<string | Error>;
  update: (item: IRepositoryItem) => Promise<IRepositoryItem | Error>;
  delete: (id: string) => Promise<boolean | Error>;

}
