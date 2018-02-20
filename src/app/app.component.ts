import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
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
    public markers: Node[];
    public typeId: string;
    public minZoom: number;
    public maxZoom: number;
    public zoom: number;
    public streetControl: boolean;
    public farm: Farm;

    constructor(public sensorDialog: MatDialog, private nodeEndpointService: NodesEndpointService, private router: Router ) {
        this.typeId = 'satellite';
        this.minZoom = 15;
        this.maxZoom = 17;
        this.zoom = 17;
        this.streetControl  = false;
        this.farm = null;
    }

    ngOnInit() {
        let editedNodes: Node[] = [];
        this.nodeEndpointService.getAPIFarm()
            .subscribe((farm:any) => {
                this.farm = new Farm(farm.uri, farm.name, farm.description, farm.location, farm.nodes);
                this.nodeEndpointService.popNodes(this.farm.nodes)
                    .subscribe(node => {
                        editedNodes.push(node);
                        this.farm.nodes = editedNodes;
                    })
                    console.log(this.farm);
            });
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
