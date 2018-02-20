import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import {SensorsPopupComponent} from './sensors-popup/sensors-popup.component';
import { NodesEndpointService } from './nodes-endpoint.service';
import { Farm } from './models/farm';
import { Node } from './models/node';
import { Router } from '@angular/router';
import { Observable as Rx } from 'rxjs';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    public markers;
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
        const editedNodes: Node[] = [];
        this.nodeEndpointService.getAPIFarm()
            .subscribe((farm: any) => {
                this.farm = new Farm(farm.uri, farm.name, farm.description, farm.location, farm.nodes);
                this.nodeEndpointService.popSensors(this.farm.nodes)
                    .subscribe((node: Observable<any> ) => {
                        node.subscribe(nodes => {
                            nodes.subscribe(eachNode => {
                                editedNodes.push(eachNode);
                            });
                            this.markers = editedNodes;
                            console.log("markers", editedNodes);
                        });
                    });
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
    displayInfoWindow(nodeInfo, gm) {
        if (gm.lastOpen != null) {
            gm.lastOpen.close();
        }
        gm.lastOpen = nodeInfo;
        nodeInfo.open();
    }
    closeInfoWindow(nodeInfo, gm) {
        setTimeout((data) => {
            if (gm.lastOpen != null) {
                gm.lastOpen.close();
            }
        }, 1000);
    }
}
