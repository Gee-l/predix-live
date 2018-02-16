import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class NodesEndpointService {
  private url = "https://jsonplaceholder.typicode.com/posts";

  constructor(private http: HttpClient) { }

  getAllNodes() {
    return this.http.get(this.url);
  }

  getNode(node, limit) {
    return this.http.get(`http://smart-iot.bcx.co.za/iiot.cloud/services/sensors/node/${node}/1518688544/${limit}`);
  }

}