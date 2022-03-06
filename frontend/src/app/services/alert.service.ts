import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

import { Alert } from '../models/alert';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private url = 'http://localhost:8080/alert';

  constructor(private http: HttpClient) { }

  getAlert(nodeId:number): Observable<Alert> {
    return this.http.get<Alert>(this.url + '/' + nodeId);
  }

  getAlerts(): Observable<Alert> {
    return this.http.get<Alert>(this.url);
  }

  updateAlert(alert:Alert): Observable<Alert> {
    return this.http.put<Alert>(this.url + '/update/' + alert.id, alert, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
