import { Component, OnInit } from '@angular/core';
import { NodesEndpointService } from '../nodes-endpoint.service'
import { Farm } from '../models/farm'

@Component({
  selector: 'visualiser',
  templateUrl: './visualiser.component.html',
  styleUrls: ['./visualiser.component.css'],
  providers: [NodesEndpointService]
})

export class VisualiserComponent {
  sensors;
  constructor(private nodeEndPointService: NodesEndpointService) { }

  showFarm() {
    let farm: Farm = this.nodeEndPointService.getFarm();
    console.log(farm);
  }
}