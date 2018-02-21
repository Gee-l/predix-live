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
import { error } from 'util';

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
    public farm: any;
    public dummyData;

    constructor(public sensorDialog: MatDialog, private nodeEndpointService: NodesEndpointService, private router: Router) {
        this.typeId = 'satellite';
        this.minZoom = 15;
        this.maxZoom = 17;
        this.zoom = 17;
        this.streetControl  = false;
        this.farm = null;
    }

    ngOnInit() {
        let finalFarm = null;
        this.nodeEndpointService.getFarm()
            .subscribe(obsevable => {
                obsevable.subscribe(observable => {
                    observable.subscribe(observable => {
                        observable.subscribe(currentFarm => {
                            finalFarm = currentFarm;
                            this.farm = finalFarm;
                            this.markers = finalFarm.nodes;
                            console.log("FINAL: ", this.farm);
                        }, error => console.log(error))
                    })
                })
            })
        /*
        //add nodes
        this.nodeEndpointService.getNodes2()
            .subscribe(nodes => {
                //add sensor
                this.nodeEndpointService.addSensorsToNodes(nodes)
                    .subscribe(nodeObservable => {
                        nodeObservable.subscribe(nodes => {
                            //add datapoints
                            this.nodeEndpointService.addSensorReadings(nodes)
                                .subscribe(sensorObservable => {
                                    sensorObservable.subscribe(newSensor => {
                                        console.log("new Sensor: ", newSensor);
                                    })
                                });
                        })
                    })
            })*/















        //working
        /*this.nodeEndpointService.getNodes()
            .subscribe(nodes => {
                nodes.subscribe(node => {
                    //get sensors for a node
                    this.nodeEndpointService.getSensors(node.uri.split('/')[2])
                        .subscribe((sensors:any[]) => {
                            console.log(sensors, "for node: ", node.name);
                            //get data points for a sensor
                            this.nodeEndpointService.getDataPerSensor(sensors)
                                .subscribe(sensorObservable => {
                                    sensorObservable.subscribe(editedSensor => {
                                        console.log("values: ", editedSensor);
                                    });
                                });
                        });
                });
            });*/
    }
    nodeSelected(name, sensors) {
        const dialogRef = this.sensorDialog.open(SensorsPopupComponent, {
            width: '40%',
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
        }, 4000);
    }
}
