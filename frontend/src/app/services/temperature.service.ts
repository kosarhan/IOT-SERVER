import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { Temperature } from '../models/temperature'; 

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class TemperatureService {
  private url = 'http://localhost:8080/temperature';

  constructor( private http: HttpClient) { }

  getValuesByNodeId(nodeId: number): Observable<Temperature[]> {
    return this.http.get<Temperature[]>(this.url + '/?nodeId=' + nodeId.toString());
  }
}
