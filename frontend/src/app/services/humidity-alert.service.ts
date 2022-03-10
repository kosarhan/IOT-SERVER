import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HumidityAlert } from '../models/humidity-alert';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HumidityAlertService {
  private url = 'http://localhost:8080/humidity_alert';

  constructor(private http: HttpClient) { }

  createHumidityAlert(alert: any): Observable<HumidityAlert>{
    return this.http.post<HumidityAlert>(this.url, alert, httpOptions);
  }

  getHumidityAlerts():Observable<HumidityAlert[]> {
    return this.http.get<HumidityAlert[]>(this.url);
  }

  getHumidityAlert(alertId: number):Observable<HumidityAlert>{
    return this.http.get<HumidityAlert>(this.url + '/' + alertId);
  }

  updateHumidityAlert(alert: HumidityAlert):Observable<HumidityAlert>{
    return this.http.put<HumidityAlert>(this.url + '/update/' + alert.id, alert, httpOptions);
  }

  deleteHumidityAlert(alertId:number):Observable<unknown>{
    return this.http.delete(this.url + '/delete/' + alertId);
  }
}
