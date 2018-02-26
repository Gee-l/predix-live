import {Component, ElementRef, OnInit, Inject, ViewChild} from '@angular/core';
import { Chart } from 'chart.js/dist/Chart.js';
import { AppOptions} from '../app-options';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-sensorinfo',
  templateUrl: './sensorinfo.component.html',
  styleUrls: ['./sensorinfo.component.css']
})
export class SensorinfoComponent implements OnInit {
  @ViewChild('sensorcn') sensorcn: ElementRef;
  public sensorInfo: any;
  private sensorOptions: any;
  private dataPoints: Array<any>;
  private labelsPoints: Array<any>;
  private labels: Array<string>;
  private colors: Array<string>;

  constructor(@Inject(MAT_DIALOG_DATA) public data) {
    console.log(this.data);
    this.dataPoints = [];
    this.colors = ['rgba(255, 83, 13, 0.5)', 'rgba(232, 44, 12, 0.5)', 'rgba(255, 0, 0, 0.5)', 'rgba(232, 12, 122, 0.5)', 'rgba(255, 13, 255, 0.5)'];
    this.labelsPoints = [];
    this.labels = [];
    this._getMapData(this.data.sensors);
    this.sensorOptions = this.setOptions('line', this.labelsPoints, 'Sensor Data',
      this.dataPoints, 'green', '#fff', 3, true);
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
  }
  dataGraph() {
      const sensorOpt = new AppOptions().chart_options(this.sensorOptions);
      this.dataPoints.forEach((value, key) => {
          sensorOpt.data.datasets.push({
              label: this.labels[key],
              data: value,
              borderColor: '#000',
              borderWidth: '#fff',
              backgroundColor: this.colors[key]
          });
      });
      this.sensorInfo = new Chart(this.sensorcn.nativeElement, sensorOpt);
  }
  private _getMapData(sensors) {
      this.dataPoints = [];
      this.labelsPoints = [];
      sensors.forEach((sensor) => {
        const dataPoint = [];
        const labelPoint = [];
          sensor.value.forEach((value) => {
              console.log(value);
              for (const key2 in value) {
                  if (key2 !== 'x' && value.hasOwnProperty(key2)) {
                      dataPoint.push(value[key2]);
                      console.log(value[key2]);
                  } else if (value.hasOwnProperty(key2)) {
                      labelPoint.push(new Date(value[key2]).toLocaleTimeString());
                  }
              }
          });
          this.labels.push(sensor.name);
          this.dataPoints.push(dataPoint);
          console.log(this.dataPoints);
          this.labelsPoints.push(labelPoint);
          console.log(this.labelsPoints);
      });
  }
}
