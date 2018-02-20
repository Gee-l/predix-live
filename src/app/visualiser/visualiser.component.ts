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
    let farm: Farm = this.nodeEndPointService.getFarm();
    let centurion: Farm  = null;
    let nodeList: Node[] = [];
    console.log(farm);
    console.log('Getting centurion');
    //GET FARM
    this.nodeEndPointService.getAPIFarm()
      .subscribe((farm: any) => {
        centurion = new Farm(farm.uri, farm.name, farm.description, farm.location, farm.nodes);
        //SET NODE LOCATION
        this.nodeEndPointService.popNodes(centurion.nodes)
          .subscribe(node => {
            nodeList.push(new Node(node.uri, node.name, node.manufacturer, node.location, node.sensors));
            //GET SENSOR VALUE BY TAG
            centurion.nodes = nodeList;
        });
    });
  }
}