import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class NodesEndpointService {
  private url = "https://jsonplaceholder.typicode.com/posts/1";
  http = null;
  
  constructor(http: HttpClient) { 
    this.http = http;
  }

  getAllNodes() {
    return this.http.get(this.url);
    //return [[1518169868562,51,3],[1518034610683,2,3],[1518016414896,51,3],[1517994306156,6,3],[1517920162469,55,3],[1517892142366,16,3],[1517615336382,53,3],[1517571836370,49,3],[1517281340530,53,3],[1517234720619,53,3],[1516068774525,36,3],[1516031214030,56,3],[1515845789170,23,3],[1515801517437,19,3],[1515706467032,13,3],[1515590404519,32,3],[1515078288665,23,3],[1515048073419,16,3],[1514971843794,18,3],[1514952407054,10,3],[1514884137085,60,3],[1514877660232,31,3],[1514857690989,42,3],[1514709520213,1,3],[1514626463760,36,3]];
  }

}
