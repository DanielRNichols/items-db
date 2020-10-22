import { IItem } from "../models/Item";
import { IQueryOptions } from "../../services/queryOptions";

export interface IItemsDataStore {

  getItems: (queryOptions?: IQueryOptions) => Promise<IItem[] | Error>;
  getItemById: (id: string) => Promise<IItem | Error>;
  addItem: (item: IItem) => Promise<string | Error>;
  updateItem: (item: IItem) => Promise<IItem | Error>;
  deleteItem: (id: string) => Promise<boolean | Error>;
}
