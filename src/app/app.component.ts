import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material';
import {SensorsPopupComponent} from './sensors-popup/sensors-popup.component';
import { NodesEndpointService } from './nodes-endpoint.service';
import { Router } from '@angular/router';
import { FarmMenuComponent } from './farm-menu/farm-menu.component';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent extends FarmMenuComponent implements OnInit {
    @ViewChild(MatDialog) mat: ElementRef;
    @ViewChild(GoogleMapsAPIWrapper) map: ElementRef;
    public markers;
    public mapRef: any;
    public typeId: string;
    public minZoom: number;
    public maxZoom: number;
    public zoom: number;
    public streetControl: boolean;
    public farm: any;
    public farms: Array<any>;
    protected gaugeInfo: Array<any>;
    protected unitsInfo: Array<any>;
    protected values: Array<any>;

    constructor(public sensorDialog: MatDialog, private nodeEndpointService: NodesEndpointService, private router: Router) {
        super(sensorDialog);
        this.typeId = 'satellite';
        this.minZoom = 15;
        this.maxZoom = 17;
        this.zoom = 17;
        this.mapRef = this.map;
        this.streetControl  = false;
        this.farm = null;
        this.gaugeInfo = [];
        this.unitsInfo = [];
        this.values = [];
    }
    ngOnInit() {
        this.nodeEndpointService.getFarm('63f2a245-4f66-42ba-bf6f-decc73f09abd')
            .subscribe(ob => {
                ob.subscribe(ob => {
                    ob.subscribe(ob => {
                        ob.subscribe(farm => {
                            this.farm = farm;
                            console.log(farm);
                            this.markers = farm.nodes;
                        })
                    })
                })
            })
        /*this.nodeEndpointService.getAllInfo()
            .subscribe(ob => {
                ob.subscribe(ob => {
                    ob.subscribe(ob => {
                        ob.subscribe(ob => {
                            ob.subscribe(ob => {
                                ob.subscribe(ob => {
                                    ob.subscribe(ob => {
                                        ob.subscribe(farms => {
                                            this.farms = [];
                                            this.farms = farms;
                                            this.farm = farms[2];
                                            this.markers =  this.farm[2].nodes;
                                            console.log("Farms: ", farms);
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })*/
    }

    public reRender(farm) {
        this.farm = farm;
        this.markers = farm.markers;
    }

    getFarm(farmUri) {
        this.nodeEndpointService.getFarm(farmUri)
        .subscribe(observable => {
            observable.subscribe(observable => {
                observable.subscribe(observable => {
                    observable.last()
                    observable.subscribe(farm => {
                        console.log(farm);
                        if (farm) {
                            // this.markers = farm.nodes;
                            // this.farm = farm;
                            // this.farms = [];
                            // this.farms.push(farm);
                            return farm;
                        }
                    })
                })
            })
        })
    }


    setMap() {
        this.mapRef = this.map;
    }
    displayInfoWindow(nodeInfo, gm) {
        console.log('Checking', this.map);
       // console.log('Native: ', this.map.setCenter({lat: 23, lng: 29}));
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
