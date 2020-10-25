import axios, { AxiosResponse } from "axios";
import LocalStorageService from "./localStorageService";
import Item from "../models/item";

export class ApiError extends Error {
  public status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

class DataService {

  private _baseUrl: string;
  private _localStorage: LocalStorageService;
  private _localStorageTokenKey = "my-model-bank-ui:token";

  constructor(baseUrl: string) {
    this._baseUrl = baseUrl;
    this._localStorage = new LocalStorageService();
  }

  query = async (url: string): Promise<AxiosResponse | ApiError> => {
    const fullUrl = `${this._baseUrl}${url}`;
    console.log(fullUrl);
    const options = {
      headers: {
        Authorization: `Bearer ${this._localStorage.getString(this._localStorageTokenKey, "")}`
      }
    }
    try {
      return axios.get(fullUrl, options);
    } catch (err) {
      if(err.response) {
        return new ApiError(err.response.status, err.response.statusText);
      } else {
        return new ApiError(500, "Server Error");
      }
    }
  }

  validateToken = async(): Promise<boolean | ApiError> => {
    const url = `validatetoken`;
    try {
      const result = await this.query(url);
      if(result instanceof ApiError)
        return result;

      if(result.status !== 200)
        return new ApiError(result.status, result.statusText);
      
      return true;
    } catch (err) {
      if(err.response) {
        return new ApiError(err.response.status, err.response.statusText);
      } else {
        return new ApiError(500, "Server Error");
      }
    }
  }

  login = async(userName: string, password: string): Promise<boolean | ApiError> => {
    const url = `${this._baseUrl}login`;
    console.log(url);
    const options = {
      headers: {
        Authorization: `Basic ${btoa(`${userName}:${password}`)}`
      }
    }
    try {
      const result = await axios.get(url, options);
      if(result.status === 200) {
        localStorage.setItem(this._localStorageTokenKey, result.data.token);
        return true;
      } else {
        return new ApiError(result.status, `${result.statusText}:${result.data.message}`);
      }
    } catch (err) {
      if(err.response) {
        return new ApiError(err.response.status, err.response.statusText);
      } else {
        return new ApiError(500, "Server Error");
      }
    }

  }

  getItems = async (queryString?: string): Promise<Item[] | ApiError> => {
    const url = `items${queryString ? `?${queryString}` : ''}`;
    console.log(`url = ${url}`);
    try {
      const result = await this.query(url);
      if(result instanceof ApiError)
        return result;
      if(result.status !== 200)
        return new ApiError(result.status, result.statusText);
      
      return result.data as Item[];
    } catch (err) {
      if(err.response) {
        return new ApiError(err.response.status, err.response.statusText);
      } else {
        return new ApiError(500, "Server Error");
      }
    }
  }

}

export default DataService;