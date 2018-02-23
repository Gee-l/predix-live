import {Component, ElementRef, OnInit, Inject, ViewChild} from '@angular/core';
import { Chart } from 'chart.js/dist/Chart.js';
import { AppOptions} from '../app-options';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-sensorinfo',
  templateUrl: './sensorinfo.component.html',
  styleUrls: ['./sensorinfo.component.css']
})
export class SensorinfoComponent implements OnInit {
  @ViewChild('sensorcn') sensorcn: ElementRef;
  public sensorInfo: any;
  private sensorOptions: Object;
  private node;
  private dataPoints = [];
  private labelsPoints = [];

  constructor(private route: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data) {
    this._getMapData(data.sensor);
    this.sensorOptions = this.setOptions('line', this.labelsPoints, 'Sensor Data',
      this.dataPoints, 'green', '#fff', 2, true);
  }

  private setOptions(type, labels, label, data, bgcolor, bcolor, width, atZero) {
    const opts: Object = {};

    opts['type'] = type;
    opts['labels'] = labels;
    opts['label'] = label;
    opts['data'] = data;
    opts['bgcolor'] = bgcolor;
    opts['bcolor'] = bcolor;
    opts['width'] = width;
    opts['startZero'] = atZero;
    return (opts);
  }
  ngOnInit() {
    this.dataGraph();
    this.node = this.route.params.subscribe(params => {console.log('Testing' + JSON.stringify(params.node));});
  }
  dataGraph() {
    console.log('Loading Data Graph');
    const sensorOpt = new AppOptions().chart_options(this.sensorOptions);
    console.log(this.sensorcn.nativeElement);
    this.sensorInfo = new Chart(this.sensorcn.nativeElement, sensorOpt);
  }
  private _getMapData(sensor) {
      this.dataPoints = [];
      this.labelsPoints = [];
    sensor.readings.forEach((value, key) => {
      console.log('Key: ' + key);
        for (const key2 in value) {
          console.log('Runnning');
          if (key2 !== 'x' && value.hasOwnProperty(key2)) {
            this.dataPoints.push(value[key2]);
          } else if (value.hasOwnProperty(key2)) {
            this.labelsPoints.push(new Date(value[key2]).toLocaleTimeString());
          }
        }
    });
  }
}
