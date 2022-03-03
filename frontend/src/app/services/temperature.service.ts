import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  getValuesByNodeIdByPageSize(nodeId: number, page:string|null, pageSize:string|null): Observable<Temperature[]>{
    if(pageSize !== null){
      if(page === null){
        return this.http.get<Temperature[]>(this.url + '/?nodeId=' + nodeId.toString() + '&pageSize=' + pageSize);
      } else {
        return this.http.get<Temperature[]>(this.url + '/?nodeId=' + nodeId.toString() + '&page=' + page + '&pageSize=' + pageSize);
      }
    }

    return this.http.get<Temperature[]>(this.url + '/?nodeId=' + nodeId.toString());
  }

  getValuesByNodeIdWithTimeFilters(nodeId: number, startDate: Date, endDate: Date): Observable<Temperature[]> {
    let tempUrl = this.url + '/?nodeId=' + nodeId.toString();

    console.log(startDate);
    console.log(endDate);

    tempUrl += '&startDate=' + startDate.toISOString();

    if (endDate !== undefined) {
      tempUrl += '&endDate=' + endDate.toISOString();
    }

    return this.http.get<Temperature[]>(tempUrl);
  }
}
