import { Component, OnInit } from '@angular/core';
import { NodesEndpointService } from '../nodes-endpoint.service'
import { Farm } from '../models/farm'
import { Node } from '../models/node'

@Component({
  selector: 'visualiser',
  templateUrl: './visualiser.component.html',
  styleUrls: ['./visualiser.component.css'],
  providers: [NodesEndpointService]
})

export class VisualiserComponent implements OnInit{
  sensors;
  constructor(private nodeEndPointService: NodesEndpointService) { }

  ngOnInit() {
    
  }
}