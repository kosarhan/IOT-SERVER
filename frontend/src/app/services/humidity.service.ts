import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Humidity } from '../models/humidity';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class HumidityService {
  private url = 'http://localhost:8080/humidity';

  constructor( private http: HttpClient) { }

  getValuesByNodeId(nodeId: number): Observable<Humidity[]> {
    return this.http.get<Humidity[]>(this.url + '/?nodeId=' + nodeId.toString());
  }

  getValuesByNodeIdByPageSize(nodeId: number, page:string|null, pageSize:string|null): Observable<Humidity[]>{
    if(pageSize !== null){
      if(page === null){
        return this.http.get<Humidity[]>(this.url + '/?nodeId=' + nodeId.toString() + '&pageSize=' + pageSize);
      } else {
        return this.http.get<Humidity[]>(this.url + '/?nodeId=' + nodeId.toString() + '&page=' + page + '&pageSize=' + pageSize);
      }
    }

    return this.http.get<Humidity[]>(this.url + '/?nodeId=' + nodeId.toString());
  }


  getValuesByNodeIdWithTimeFilters(nodeId: number, startDate: Date, endDate: Date): Observable<Humidity[]> {
    let tempUrl = this.url + '/?nodeId=' + nodeId.toString();

    // console.log(startDate);
    // console.log(endDate);

    tempUrl += '&startDate=' + startDate.toISOString();

    if (endDate !== undefined) {
      tempUrl += '&endDate=' + endDate.toISOString();
    }

    return this.http.get<Humidity[]>(tempUrl);
  }
}
