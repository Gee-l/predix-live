import { Component, OnInit } from '@angular/core';
import { NodesEndpointService } from '../nodes-endpoint.service'
import { Farm } from '../models/farm'

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
    let farm: Farm = this.nodeEndPointService.getFarm();
    console.log(farm);
    console.log('Getting centurion');
    this.nodeEndPointService.getAPIFarm((error, farm) => {
      (error)? console.log(error) : console.log('Centurion Farm', farm);
    })
  }
}