import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AlertLog } from '../models/alert-log';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AlertLogService {
  private url = 'http://localhost:8080/alert_log';

  constructor(private http: HttpClient) { }

  getAlertLogs(): Observable<AlertLog[]> {
    return this.http.get<AlertLog[]>(this.url);
  }
}
