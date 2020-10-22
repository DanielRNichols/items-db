import { IItem } from "../models/Item";
import { IItemsRepository } from "./IItemsRepository";
import { IItemsDataStore } from "../dataStores/IItemsDataStore";
import { IQueryOptions } from "../../services/queryOptions";

export class ItemsRepository implements IItemsRepository {

  private _dataStore: IItemsDataStore;

  constructor(dataStore: IItemsDataStore) {
    this._dataStore = dataStore;
  }

  public async get(queryOptions?: IQueryOptions): Promise<IItem[] | Error> {
    return this._dataStore.getItems(queryOptions);
  }

  public async getById(id: string): Promise<IItem | Error> {
    return this._dataStore.getItemById(id);
  }

  public async add(item: IItem): Promise<string | Error> {
    return this._dataStore.addItem(item);
  }

  public async update(item: IItem): Promise<IItem | Error> {
    return this._dataStore.updateItem(item);
  }

  public async delete(id: string): Promise<boolean | Error> {
    return this._dataStore.deleteItem(id);
  }

}
