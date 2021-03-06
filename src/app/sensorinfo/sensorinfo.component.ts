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
    this.colors = ['rgba(212, 198, 117, 0.7)', 'rgba(208, 154, 88, 0.7))', 'rgba(171, 71, 71, 0.7)', 'rgba(126, 62, 62, 0.7)', 'rgba(60, 60, 69, 0.7)'];
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
    console.log(this.data);
  }
  dataGraph() {
      const sensorOpt = new AppOptions().chart_options(this.sensorOptions);
      console.log(this.labels);
      this.dataPoints.forEach((value, key) => {
          sensorOpt.data.datasets.push({
              label: this.labels[key] === 'InternalTemperature' ?
                  'Temp (' + this.data.unitsInfo[key] + ')' : this.labels[key] + `(${this.data.unitsInfo[key]})`,
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
                      dataPoint.push(value.value);
                      labelPoint.push(new Date(value.time).toLocaleTimeString());
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
