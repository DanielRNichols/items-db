import {Api} from "./api/api";
import {IApiRouter} from "./api/routers/IApiRouter";
import { ItemsRouter } from "./api/routers/ItemsRouter";
import { ItemsController } from "./api/controllers/ItemsController";
import { ItemsRepository } from "./api/repositories/ItemsRepository";

import { SqliteConnection } from "./services/sqliteConnection";
import { ItemsDb } from "./api/dataStores/ItemsDb";

import {SocketService} from "./services/socketService";

import * as dotenv from "dotenv";

const initialize = async (): Promise <boolean | Error> => {
  if (process.env.NODE_ENV !== "production") {
    dotenv.config();
  }

  const api = new Api();
  const socketService = new SocketService(api.httpServer);

  const dbPath = process.env.DB ? process.env.DB : "./data/model.db";
  console.log(`dbPath = ${dbPath}`);
  const sqliteConnection = new SqliteConnection();
  try {
    const r = await sqliteConnection.connect(dbPath);
    if(r instanceof Error) {
      console.log(`Unable to connect to ${dbPath}`);
      return r;
    }
  } catch (err) {
    console.log(`Unable to connect to ${dbPath}`);
    return new Error(err.message);
  }

  const itemsDb = new ItemsDb(sqliteConnection);

  const routers: IApiRouter[] = [
    new ItemsRouter(new ItemsController(new ItemsRepository(itemsDb), socketService)),
    
  ];

  api.start(routers);

  return true;
}

// tslint:disable-next-line: no-floating-promises
(async () => {
  try {
    const result = await initialize();
    console.log(result);
  } catch (err) {
    console.log(err.message);
  }
})();


// let counter: number = 0;
// setInterval(() => {
//   const now = new Date();
//   console.log(`${counter++}: ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`);
// }, 1000);
