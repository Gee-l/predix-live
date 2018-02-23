import { Component, OnInit, Input, AfterViewInit} from '@angular/core';
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
  constructor(private sensorDialog: MatDialog) {
      this.gaugeInfo = [];
      this.unitsInfo = [];
      this.values = [];
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
            , unitsInfo: this.unitsInfo, values: this.values},
            position: {top: '0%'}
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('Dialog Closed');
        });
    }
    private getGaugeInfo(sensors) {
      this.gaugeInfo = [];
      this.values = [];
        sensors.forEach((value, key) => {
            const readings = value.readings;
            this.gaugeInfo.push({'name': value.tag, 'value': readings[readings.length - 1]['value'], 'active': true});
            this.unitsInfo.push({'uom': value.uom});
            this.values.push(readings[readings.length - 1]['value']);
        });
        console.log(this.gaugeInfo);
        console.log(this.unitsInfo);
    }
}

