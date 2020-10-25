import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private storageSupported = false;

  constructor() {
    if (typeof (Storage) !== 'undefined') {
      this.storageSupported = true;
    }
  }

  private getItem = (key: string, defVal: any): string => {
    let retVal = defVal;
    if (this.storageSupported) {
      const storageStr = localStorage.getItem(key);
      if (storageStr != null) {
        retVal = storageStr;
      }
    }
    return retVal;
  }

  public getString = (key: string, defVal: string): string => {
    return this.getItem(key, defVal);
  }

  public getBool = (key: string, defVal: boolean): boolean => {
    const retVal = this.getItem(key, defVal);
    return ((retVal === 'false') || (retVal === '0')) ? false : true;
  }

  public getInt = (key: string, defVal: number) => {
    const val = this.getItem(key, defVal);
    return parseInt(val, 10);
  }

  public getReal = (key: string, defVal: number) => {
    return parseFloat(this.getItem(key, defVal));
  }

  public setItem = (key: string, value: any) => {
    if (this.storageSupported) {
      localStorage.setItem(key, value);
    }
  }

  public removeItem = (key: string) => {
    if (this.storageSupported) {
      localStorage.removeItem(key);
    }
  }

}


