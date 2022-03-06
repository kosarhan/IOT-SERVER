import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TemperatureAlert } from '../models/temperature-alert';

@Injectable({
  providedIn: 'root'
})
export class TemperatureAlertService {
  private url = 'http://localhost:8080/temperature_alert';

  constructor(private http: HttpClient) { }

  getTemperatureAlerts():Observable<TemperatureAlert[]>{
    return this.http.get<TemperatureAlert[]>(this.url);
  }

  getTemperatureAlert(alertId: number):Observable<TemperatureAlert>{
    return this.http.get<TemperatureAlert>(this.url + '/' + alertId);
  }
}
