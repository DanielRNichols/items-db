import { IItemsDataStore } from "./IItemsDataStore";
import { IItem } from "../models/Item";
import { SqliteConnection } from "../../services/sqliteConnection";
import { IQueryOptions } from "../../services/queryOptions";

const rowToItem = (row: any): IItem => {
  return {
    id: row.id,
    className: row.className,
    tag: row.tag,
    description: row.description,
    properties: row.properties ? JSON.parse(row.properties) : [],
  };
};

const rowsToItemArray = (rows: any[]): IItem[] => {
  const items: IItem[] = [];
  if (rows) {
    rows.map((row) => {
      items.push(rowToItem(row));
    });
  }

  return items;
};

export class ItemsDb implements IItemsDataStore {

  private _tableName = "items";
  private _sqliteConnection: SqliteConnection;

  constructor(sqliteConnection: SqliteConnection) {
    this._sqliteConnection = sqliteConnection;
  }

  public async getItems(queryOptions?: IQueryOptions): Promise<IItem[] | Error> {
    const query = this._sqliteConnection.getQueryString(this._tableName, queryOptions);
    console.log(`query = ${query}`);
    try {
      const result = await this._sqliteConnection.query(query);
      if (result instanceof Error) {
        return result;
      }
      return(rowsToItemArray(result));
    } catch (err) {
      throw err;
    }
  }

  public async getItemById(id: string): Promise<IItem | Error> {
    const query = `Select * from ${this._tableName} where id=${id}`;
    try {
      const result = await this._sqliteConnection.query(query);
      if (result instanceof Error) {
        return result;
      }
      if (result.length <= 0) {
        return new Error(`No record found for id:[${id}]`);
      }
      return(rowToItem(result[0]));
    } catch (err) {
      throw err;
    }
  }

  public async addItem(item: IItem): Promise<string | Error> {
    const className = item.className;
    const tag = item.tag;
    const description = item.description;
    const properties = item.properties ? JSON.stringify(item.properties) : "";
    const query = `Insert into ${this._tableName} (className, tag, description, properties) Values
                    ('${className}', '${tag}', '${description}', '${properties}')`;
    try {
      const result = await this._sqliteConnection.execute(query);
      if (result instanceof Error) {
        return result;
      }
      return(result.lastId);
    } catch (err) {
      throw err;
    }
}

  public async updateItem(item: IItem): Promise<IItem | Error> {
    const className = item.className;
    const tag = item.tag;
    const description = item.description;
    const properties = item.properties ? JSON.stringify(item.properties) : "";
    const query = `Update ${this._tableName}
                   Set className='${className}',
                       tag ='${tag}',
                       description ='${description}',
                       properties='${properties}'
                    Where id=${item.id}`;
    try {
      const result = await this._sqliteConnection.execute(query);
      if (result instanceof Error) {
        return result;
      }
      if (result.rowsAffected <= 0) {
        return new Error(`No record found for id:[${item.id}]`);
      }
      return(item);
    } catch (err) {
      throw err;
    }
  }

  public async deleteItem(id: string): Promise<boolean | Error> {
    const query = `Delete from ${this._tableName} where id=${id}`;
    try {
      const result = await this._sqliteConnection.execute(query);
      if (result instanceof Error) {
        return result;
      }
      if (result.rowsAffected <= 0) {
        return new Error(`No record found for id:[${id}]`);
      }
      return(true);
    } catch (err) {
      throw err;
    }
  }

}
