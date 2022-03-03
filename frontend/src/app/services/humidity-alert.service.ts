import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HumidityAlert } from '../models/humidity-alert';

@Injectable({
  providedIn: 'root'
})
export class HumidityAlertService {
  private url = 'http://localhost:8080/humidity_alert';

  constructor(private http: HttpClient) { }

  getHumidityAlerts():Observable<HumidityAlert[]> {
    return this.http.get<HumidityAlert[]>(this.url);
  }
}
