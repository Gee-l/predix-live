import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material';
import { NodesEndpointService } from './nodes-endpoint.service';
import { FarmMenuComponent } from './farm-menu/farm-menu.component';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { MarkerManager } from '@agm/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent extends FarmMenuComponent implements OnInit {
    @ViewChild(MatDialog) mat: ElementRef;
    @ViewChild(GoogleMapsAPIWrapper) map: ElementRef;
    @ViewChild(MarkerManager) marker: ElementRef;
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
    constructor(public sensorDialog: MatDialog, private nodeEndpointService: NodesEndpointService) {
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
        this.farms = [];
    }
    ngOnInit() {
        this.nodeEndpointService.getFarms()
            .subscribe(observable => {
                observable.subscribe(farms => {
                this.nodeEndpointService.getFarm(farms[2].uri.split('/')[2])
                        .subscribe(observable => {
                            observable.subscribe(observable => {
                                observable.subscribe(observable => {
                                    observable.subscribe(farm => {
                                        if (farm) {
                                            this.markers = farm.nodes;
                                            this.farms = [];
                                            this.farms.push(farm);
                                            const farm2 = JSON.parse(JSON.stringify(farm));
                                            farm2.name = 'Other Farm';
                                            farm2.nodes[0].name = 'Edited Node';
                                            farm2.location.latitute = -23.95948;
                                            console.log(farm2);
                                            this.farms.push(farm2);
                                            this.farm =  farm;
                                        }
                                    })
                                })
                            })
                        })
                })
            })
    }
    setMap() {
        this.mapRef = this.map;
    }
    displayInfoWindow(nodeInfo, gm) {
        console.log(this.farm);
        this.farm.location.latitute = -23.95948;
       // console.log('Native: ', this.map.setCenter({lat: 23, lng: 29}));
        if (gm.lastOpen != null) {
            gm.lastOpen.close();
        }
        gm.lastOpen = nodeInfo;
        nodeInfo.open();
        console.log(this.marker);
    }
    closeInfoWindow(nodeInfo, gm) {
        setTimeout((data) => {
            if (gm.lastOpen != null) {
                gm.lastOpen.close();
            }
        }, 1000);
    }
}
