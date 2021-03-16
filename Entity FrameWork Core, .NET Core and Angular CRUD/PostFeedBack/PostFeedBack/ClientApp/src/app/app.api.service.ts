import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})


@Injectable()
export class ApiService {

  public baseUri = 'https://localhost:44392/api/';
  public IsNavbarVisible: boolean;

  constructor(public httpClient: HttpClient) {
  }

  createClientHeader(): { headers: HttpHeaders } {
    //let currentUser: CurrentUser = this.auth.getCurrentUser();
    let token = '';
    //if (currentUser != null) {
    //  token = currentUser.Token;
    //}
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        //'Authorization': token
      })
    };
    return httpOptions;
  }

  public httpGet<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(this.baseUri + url, this.createClientHeader())
      .pipe(
        catchError(this.handleClientError)
      );
  }

  public httpPost<T>(url: string, body: any): Observable<T> {
    return this.httpClient.post<T>(this.baseUri + url, body, this.createClientHeader())
      .pipe(
        catchError(this.handleClientError)
      );
  }

  public httpDelete<T>(url: string, key: any): Observable<T> {
    return this.httpClient.delete<T>(this.baseUri + url + key, this.createClientHeader())
      .pipe(
        catchError(this.handleClientError)
      );
  }

  public handleClientError(error: HttpErrorResponse) {
    return throwError(error.message || 'An error has been occurred. Please try again or contact to system administrator');
  }
}

@Injectable()
export class PubSubService {
  public subjects: Subject<any>[] = [];

  publish(eventName: string) {
    this.subjects[eventName] = this.subjects[eventName] || new Subject<any>();
    this.subjects[eventName].next();
  }

  on(eventName: string): Observable<any> {
    this.subjects[eventName] = this.subjects[eventName] || new Subject<any>();
    return this.subjects[eventName].asObservable();
  }

}


