import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { VisualiserComponent } from './visualiser/visualiser.component';
import {SensorsPopupComponent} from './sensors-popup/sensors-popup.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
    lat = -33.5049805;
    lng = 19.5635469;
    typeId = 'satellite';
    minZoom = 15;
    maxZoom = 17;
    zoom = 17;
    streetControl = false;

    constructor(public sensorDialog: MatDialog) {
    }

    markers = [
        {
            nodeName: 'node6',
            lat: -33.50489829329936,
            lng: 19.564772844314575
        },
        {
            nodeName: 'node1',
            lat: -33.50548873507302,
            lng: 19.563560485839844
        },
        {
            nodeName: 'node2',
            lat: -33.50622230863511,
            lng: 19.56491231918335
        },
        {
            nodeName: 'node3',
            lat: -33.507716274589654,
            lng: 19.565019607543945
        },
        {
            nodeName: 'node4',
            lat: -33.507134793900434,
            lng: 19.566253423690796
        }
    ];

    nodeSelected(uri) {
        const dialogRef = this.sensorDialog.open(SensorsPopupComponent, {
            width: '250px',
            data: { name: uri}
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('Dialog Closed');
          console.log('Result');
        });
    }
}
