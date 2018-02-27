import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material';
import {SensorsPopupComponent} from './sensors-popup/sensors-popup.component';
import { NodesEndpointService } from './nodes-endpoint.service';
import { Router } from '@angular/router';
import { FarmMenuComponent } from './farm-menu/farm-menu.component';
import { GoogleMapsAPIWrapper } from '@agm/core';

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
