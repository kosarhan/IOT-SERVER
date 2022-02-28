import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { Node } from '../models/node';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class NodeService {
  private url = 'http://localhost:8080/node';

  constructor(private http: HttpClient) { }

  getNodes(): Observable<Node[]> {
    return this.http.get<Node[]>(this.url);
  }

  getNode(id: number): Observable<Node> {
    // console.log(this.url + '/' + id);
    return this.http.get<Node>(this.url + '/' + id);
    // return null;
  }

  updateNode(node: Node): void {
    console.log(node);
    console.log(this.url + '/update/' + node.id);
    this.http.put<Node>(this.url + '/update/' + node.id, node, httpOptions);
  }
}