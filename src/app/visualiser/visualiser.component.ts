import { Component, OnInit } from '@angular/core';
import { NodesEndpointService } from '../nodes-endpoint.service'
import { Farm } from '../models/farm'

@Component({
  selector: 'visualiser',
  templateUrl: './visualiser.component.html',
  styleUrls: ['./visualiser.component.css'],
  providers: [NodesEndpointService]
})

export class VisualiserComponent implements OnInit {
  sensors;
  constructor(private nodeEndPointService: NodesEndpointService) { }

  ngOnInit() {
    this.nodeEndPointService.getNode('A81758FFFE0301F0', 4)
      .subscribe(
        data => {
          console.log('result', data);
        },
        error => {
          console.log('Failed with', error)
        },
        () => console.log('successfull')
      )
    this.showFarm();
  }

  sayHello(event) {
    console.log("Hello");
  }

  showFarm() {
    let farm: Farm = this.nodeEndPointService.getFarm();
    console.log(farm);
  }
}