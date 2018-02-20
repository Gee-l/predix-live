import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { VisualiserComponent } from './visualiser/visualiser.component';
import {SensorsPopupComponent} from './sensors-popup/sensors-popup.component';
import { NodesEndpointService } from './nodes-endpoint.service';
import { Farm } from './models/farm';
import { Node } from './models/node';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    markers: Node[];
    typeId = 'satellite';
    minZoom = 15;
    maxZoom = 17;
    zoom = 17;
    streetControl = false;
    farm: Farm;

    constructor(public sensorDialog: MatDialog, private nodeEndpointService: NodesEndpointService, private router: Router ) {}

    ngOnInit() {
        const _farm = this.nodeEndpointService.getFarm();
        this.farm = _farm;
        this.markers = _farm.nodes;
    }
    nodeSelected(name, sensors) {
        const dialogRef = this.sensorDialog.open(SensorsPopupComponent, {
            width: '80%',
            data: { fname: this.farm.name, name: name, sensors: sensors}
        });
        console.log(this.farm.nodes[0]);
        dialogRef.afterClosed().subscribe(result => {
            console.log(this.router.navigate(['/']));
            console.log('Dialog Closed');
            console.log('Result');
        });
    }
}
