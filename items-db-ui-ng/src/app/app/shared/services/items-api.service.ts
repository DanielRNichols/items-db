import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { IItem } from '../../items/models/item';
import { ILoginResult } from '../../users/models/loginResult';
import { LocalStorageService } from './localStorage.service';

@Injectable({
  providedIn: 'root'
})
export class ItemsApiService {

  private apiUrl = 'http://localhost:4080/api/';

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {

  }

  getItems = (queryStr?: string): Observable<IItem[]> => {
    const url = `${this.apiUrl}items/${queryStr ? '?' + queryStr : ''}`;
    console.log(url);

    const options = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.localStorageService.getString('idb:token', '')}`
      })
    };

    return this.http.get<IItem[]>(url, options).pipe(
      tap(items => console.log(JSON.stringify(items))),
      catchError(this.handleError)
    );
  }

  getItem = (id: number): Observable<IItem> => {
    const url = `${this.apiUrl}items/${id}`;
    console.log(url);

    const options = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.localStorageService.getString('idb:token', '')}`
      })
    };

    return this.http.get<IItem>(url, options).pipe(
      tap(item => console.log(JSON.stringify(item))),
      catchError(this.handleError)
    );
  }


  login = (userName: string, password: string): Observable<ILoginResult> => {
    const url = `${this.apiUrl}login`;
    console.log(url);

    const options = {
      headers: new HttpHeaders({
        Authorization: `Basic ${btoa(`${userName}:${password}`)}`
      })
    };

    return this.http.get<ILoginResult>(url, options).pipe(
      tap(items => console.log(JSON.stringify(items))),
      catchError(this.handleError)
    );
  }

  private handleError = (err: HttpErrorResponse) => {

    let errMsg = '';
    if (err.error instanceof ErrorEvent) {
      errMsg = `Error: ${err.error.message}`;
    } else {
      errMsg = this.getServerErrorMessage(err);
    }
    console.log(errMsg);
    return throwError(errMsg);

  }

  private getServerErrorMessage = (err: HttpErrorResponse): string => {
    switch (err.status) {
        case 401: {
            return `Not Authorized: ${err.message}`;
        }
        case 403: {
            return `Access Denied: ${err.message}`;
        }
        case 404: {
          return `Not Found: ${err.message}`;
      }
      case 500: {
            return `Internal Server Error: ${err.message}`;
        }
        default: {
            return `Unknown Server Error: ${err.message}`;
        }

    }
  }

}
