import { Component, OnInit, Input} from '@angular/core';
import {SensorsPopupComponent} from '../sensors-popup/sensors-popup.component';
import { MatDialog} from '@angular/material';

@Component({
  selector: 'app-farm-menu',
  templateUrl: './farm-menu.component.html',
  styleUrls: ['./farm-menu.component.css']
})
export class FarmMenuComponent implements OnInit {
  @Input() farms: Array<any>;
  @Input() nodes: Array<any>;
  private gaugeInfo: Array<any>;
  private unitsInfo: Array<any>;
  private values: Array<any>;
  private timeSeries: Array<any>;
  constructor(private sensorDialog: MatDialog) {
      this.gaugeInfo = [];
      this.unitsInfo = [];
      this.values = [];
      this.timeSeries = [];
  }
  ngOnInit() {}
  public updateNodes(nodes) {
    if (JSON.stringify(this.nodes) !== JSON.stringify(nodes)) {
      this.nodes = nodes;
    }
  }
  public nodeSelected(name, sensors) {
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
    private getGaugeInfo(sensors) {
      this.gaugeInfo = [];
      this.values = [];
      this.unitsInfo = [];
      this.timeSeries = [];
      sensors.forEach((value) => {
          this.gaugeInfo.push({'name': value.tag,
              'value': value.lastReading, 'active': true});
          this.unitsInfo.push({'uom': value.uom});
          this.values.push(value.lastReading);
          this.timeSeries.push(value.readings);
      });
      this.values = this._validate_value(this.values);
    }
    private _validate_value(values) {
      for (let i = 0; i < values.length; i++) {
          if (values[i] === undefined) {
              values.splice(i, 1);
              i = -1;
          }
      }
      return values;
    }
}

