import { Component, OnInit } from '@angular/core';
import { NodesEndpointService } from '../nodes-endpoint.service'


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
    this.nodeEndPointService.getAllNodes()
      .subscribe(
        data => {
          this.sensors = [JSON.stringify(data)]
          console.log(this.sensors);
        },
        error => alert(error),
        () => console.log('Fninished')
      );
  }
}
