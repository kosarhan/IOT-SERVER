import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { TemperatureAlert } from '../models/temperature-alert';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TemperatureAlertService {
  private url = 'http://localhost:8080/temperature_alert';

  constructor(private http: HttpClient) { }

  createTemperatureAlert(alert: any): Observable<TemperatureAlert>{
    return this.http.post<TemperatureAlert>(this.url, alert, httpOptions);
  }

  getTemperatureAlerts():Observable<TemperatureAlert[]>{
    return this.http.get<TemperatureAlert[]>(this.url);
  }

  getTemperatureAlert(alertId: number):Observable<TemperatureAlert>{
    return this.http.get<TemperatureAlert>(this.url + '/' + alertId);
  }

  updateTemperatureAlert(alert: TemperatureAlert):Observable<TemperatureAlert>{
    return this.http.put<TemperatureAlert>(this.url + '/update/' + alert.id, alert, httpOptions);
  }

  deleteTemperatureAlert(alertId:number):Observable<unknown>{
    return this.http.delete(this.url + '/delete/' + alertId);
  }
}
