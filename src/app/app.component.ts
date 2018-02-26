import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material';
import {SensorsPopupComponent} from './sensors-popup/sensors-popup.component';
import { NodesEndpointService } from './nodes-endpoint.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    @ViewChild(MatDialog) mat: ElementRef;
    public markers;
    public typeId: string;
    public minZoom: number;
    public maxZoom: number;
    public zoom: number;
    public streetControl: boolean;
    public farm: any;
    public farms: Array<any>;
    private gaugeInfo: Array<any>;
    private unitsInfo: Array<any>;
    private values: Array<any>;

    constructor(public sensorDialog: MatDialog, private nodeEndpointService: NodesEndpointService, private router: Router) {
        this.typeId = 'satellite';
        this.minZoom = 15;
        this.maxZoom = 17;
        this.zoom = 17;
        this.streetControl  = false;
        this.farm = null;
        this.gaugeInfo = [];
        this.unitsInfo = [];
        this.values = [];
    }

    ngOnInit() {
        this.nodeEndpointService.getFarms()
            .subscribe(res => {
                console.log("each res is: ", res);
            })


        // let finalFarm = null;
        // this.nodeEndpointService.getFarm()
        //     .subscribe(obsevable => {
        //         obsevable.subscribe(observable => {
        //             observable.subscribe(obsevable2 => {
        //                 obsevable2.subscribe(currentFarm => {
        //                     finalFarm = currentFarm;
        //                     this.farm = finalFarm;
        //                     this.markers = finalFarm.nodes;
        //                     this.farms = [];
        //                     this.farms.push(this.farm);
        //                     this.farms.push(this.farm);
        //                     console.log('FINAL: ', this.farm);
        //                 }, error => console.log(error));
        //             });
        //         });
        //     });
    }

    nodeSelected(name, sensors) {
        this.getGaugeInfo(sensors);
        const dialogRef = this.sensorDialog.open(SensorsPopupComponent, {
            width: '40%',
            data: { fname: this.farm.name, name: name, sensors: sensors},
            position: {top: '0%'}
        });
        console.log(sensors);
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
       /* setTimeout((data) => {
            if (gm.lastOpen != null) {
                gm.lastOpen.close();
            }
        }, 10000);*/
    }
    private getGaugeInfo(sensors) {
        this.unitsInfo = [];
        this.gaugeInfo = [];
        this.values = [];
        sensors.forEach((value) => {
            const readings = value.readings;
            this.gaugeInfo.push({'name': value.tag, 'value': readings[readings.length - 1]['value'], 'active': true});
            this.unitsInfo.push({'uom': value.uom});
            this.values.push(readings[readings.length - 1]['value']);
        });
        console.log(this.gaugeInfo);
        console.log(this.unitsInfo);
    }
}
