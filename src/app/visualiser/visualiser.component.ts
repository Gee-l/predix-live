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
  }
}