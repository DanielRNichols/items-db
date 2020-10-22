class LocalStorageService {

  private _storageSupported = false;

  constructor() {
    if (typeof (Storage) !== "undefined")
      this._storageSupported = true;
  }

  private _getItem = (key: string, defVal: any): string => {
    let retVal = defVal;
    if (this._storageSupported) {
      const storageStr = localStorage.getItem(key);
      if (storageStr != null)
        retVal = storageStr;
    }
    return retVal;
  }

  public getString = (key: string, defVal: string): string => {
    return this._getItem(key, defVal);
  }

  public getBool = (key: string, defVal: boolean): boolean => {
    const retVal = this._getItem(key, defVal);
    return ((retVal === "false") || (retVal === "0")) ? false : true;
  }

  public getInt = (key: string, defVal: number) => {
    const val = this._getItem(key, defVal);
    return parseInt(val, 10);
  }

  public getReal = (key: string, defVal: number) => {
    return parseFloat(this._getItem(key, defVal));
  }

  public setItem = (key: string, value: any) => {
    if (this._storageSupported)
      localStorage.setItem(key, value);
  }

  public removeItem = (key: string) => {
    if (this._storageSupported)
      localStorage.removeItem(key);
  }

}

export default LocalStorageService;
