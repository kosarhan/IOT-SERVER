import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GPS } from '../models/gps';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class GPSService {
  private url = 'http://localhost:8080/gps'

  constructor(private http:HttpClient) { }

  getValuesByNodeId(nodeId: number): Observable<GPS[]> {
    return this.http.get<GPS[]>(this.url + '/?nodeId=' + nodeId.toString());
  }

  getValuesByNodeIdByPageSize(nodeId: number, page:string|null, pageSize:string|null): Observable<GPS[]>{
    if(pageSize !== null){
      if(page === null){
        return this.http.get<GPS[]>(this.url + '/?nodeId=' + nodeId.toString() + '&pageSize=' + pageSize);
      } else {
        return this.http.get<GPS[]>(this.url + '/?nodeId=' + nodeId.toString() + '&page=' + page + '&pageSize=' + pageSize);
      }
    }

    return this.http.get<GPS[]>(this.url + '/?nodeId=' + nodeId.toString());
  }


  getValuesByNodeIdWithTimeFilters(nodeId: number, startDate: Date, endDate: Date): Observable<GPS[]> {
    let tempUrl = this.url + '/?nodeId=' + nodeId.toString();

    // console.log(startDate);
    // console.log(endDate);

    tempUrl += '&startDate=' + startDate.toISOString();

    if (endDate !== undefined) {
      tempUrl += '&endDate=' + endDate.toISOString();
    }

    return this.http.get<GPS[]>(tempUrl);
  }
}
