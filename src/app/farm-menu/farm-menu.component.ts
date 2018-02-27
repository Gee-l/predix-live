import {Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import {SensorsPopupComponent} from '../sensors-popup/sensors-popup.component';
import { MatDialog} from '@angular/material';
import {animate, style, transition, trigger} from '@angular/animations';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-farm-menu',
  templateUrl: './farm-menu.component.html',
  styleUrls: ['./farm-menu.component.css'],
    animations: [
        trigger('fade', [
          transition(':enter', [
              style({opacity: 0, transform: 'translateX(20px)'}),
              animate(2000, style({opacity: 1, transform: 'translateX(0px)'}))
          ])
        ])
    ]
})
export class FarmMenuComponent implements OnInit {
  @Input() farms: Array<any>;
  @Input() nodes: Array<any>;
  @Input() mapRef: any;
  @Input() markers: any;
  @Input() farm: any;
  protected gaugeInfo: Array<any>;
  protected unitsInfo: Array<any>;
  protected values: Array<any>;
  protected timeSeries: Array<any>;
  constructor(protected sensorDialog: MatDialog) {
      this.gaugeInfo = [];
      this.unitsInfo = [];
      this.values = [];
      this.timeSeries = [];
  }
  ngOnInit() {}
  public updateNodes(farm) {
    this.farm = farm;
    this.markers = farm.nodes;
  }
  public nodeSelected(name, sensors, marker) {
      this.mapRef.setCenter({lat: marker.location.latitude + 0.0015, lng: marker.location.longitude});
      this.getGaugeInfo(sensors);
        const dialogRef = this.sensorDialog.open(SensorsPopupComponent, {
            width: '50%',
            data: { fname: this.farms[0].name, name: name, sensors: this.gaugeInfo
            , unitsInfo: this.unitsInfo, values: this.values, timeSeries: this.timeSeries},
            position: {top: '0%'}
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('Dialog Closed');
        });
    }
    protected getGaugeInfo(sensors) {
      this.gaugeInfo = [];
      this.values = [];
      this.unitsInfo = [];
      this.timeSeries = [];
      sensors.forEach((value) => {
          this.gaugeInfo.push({'name': value.tag,
              'value': value.lastReading, 'active': true});
          this.unitsInfo.push(value.uom);
          this.values.push(value.lastReading);
          this.timeSeries.push(value.readings);
      });
      this.values = this._validate_value(this.values);
    }
    protected _validate_value(values) {
      for (let i = 0; i < values.length; i++) {
          if (values[i] === undefined) {
              values.splice(i, 1);
              i = -1;
          }
      }
      return values;
    }
}

