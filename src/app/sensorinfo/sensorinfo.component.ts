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
    this.dataPoints = [];
    this.colors = ['#000', '#041', 'yellow', 'cyan', 'pink'];
    this.labelsPoints = [];
    this.labels = [];
    this._getMapData(this.data.timeSeries);
    this._populateLabels(this.data.sensors);
    this.sensorOptions = this.setOptions('line', this.labelsPoints[0], 'Sensor Data',
      this.dataPoints, 'green', '#fff', 2, true);
    console.log('Testing received data: ', this.data);
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
      console.log(this.labels);
      this.dataPoints.forEach((value, key) => {
          sensorOpt.data.datasets.push({
              label: this.labels[key] === 'InternalTemperature' ? 'T' : this.labels[key],
              data: value,
              borderColor: '#000',
              borderWidth: '#fff',
              backgroundColor: this.colors[key]
          });
      });
      console.log(JSON.stringify(sensorOpt));
      this.sensorInfo = new Chart(this.sensorcn.nativeElement, sensorOpt);
  }
  private _getMapData(timeSeries) {
      this.dataPoints = [];
      this.labelsPoints = [];
      this.labels = [];
      timeSeries.forEach((tValue) => {
        const dataPoint = [];
        const labelPoint = [];
          tValue.forEach((value) => {
              for (const key2 in value) {
                  if (key2 !== 'x' && value.hasOwnProperty(key2)) {
                      dataPoint.push(value[key2]);
                  } else if (value.hasOwnProperty(key2)) {
                      labelPoint.push(new Date(value[key2]).toLocaleTimeString());
                  }
              }
          });
          this.dataPoints.push(dataPoint);
          console.log('Data Points', this.dataPoints);
          this.labelsPoints.push(labelPoint);
          console.log('Labels Points', this.labelsPoints);
      });
  }
  private _populateLabels(sensors) {
      this.labels = [];
      sensors.forEach((sensor) => {
         this.labels.push(sensor.name)
      });
  }
}
