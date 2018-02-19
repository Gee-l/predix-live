import {Component, ElementRef, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import { Chart } from 'chart.js/dist/Chart.js';
import { AppOptions} from '../app-options';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sensorinfo',
  templateUrl: './sensorinfo.component.html',
  styleUrls: ['./sensorinfo.component.css']
})
export class SensorinfoComponent implements OnInit {
  @ViewChild('batterycn') batterycn: ElementRef;
  @ViewChild('statecn') statecn: ElementRef;
  @ViewChild('sensorcn') sensorcn: ElementRef;
  public batteryInfo: any;
  public stateInfo: any;
  public sensorInfo: any;
  private batteryOptions: Object;
  private stateOptions: Object;
  private sensorOptions: Object;
  private node;

  constructor(private route: ActivatedRoute) {
    this.batteryOptions = this.setOptions('line', [1, 2, 3, 4, 5, 6, 7, 8], 'Battery Info',
      [12, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1], '#000', '#fff', 2, true);
    this.stateOptions = this.setOptions('line', [, 2, 3, 4, 5, 6, 7, 8], 'Sensor State',
      [0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1], 'green ', '#fff', 2, true);
    this.sensorOptions = this.setOptions('line', [, 2, 3, 4, 5, 6, 7, 8], 'Sensor Data',
      [76, 34, 30, 12, 80, 100, 140, 3, 60, 45, 30], 'green', '#fff', 2, true);
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
    this.batteryGraph();
    this.stateGraph();
    this.dataGraph();
    this.node = this.route.params.subscribe(params => {console.log(params);});
  }
  batteryGraph() {
    const batteryOpt = new AppOptions().chart_options(this.batteryOptions);
    this.batteryInfo = new Chart(this.batterycn.nativeElement, batteryOpt);
  }
  stateGraph() {
    const stateOpt = new AppOptions().chart_options(this.stateOptions);
    stateOpt['data']['datasets'][0]['steppedLine'] = true;
    console.log(stateOpt);
    this.stateInfo = new Chart(this.statecn.nativeElement, stateOpt);
  }
  dataGraph() {
    console.log('Loading Data Graph');
    const sensorOpt = new AppOptions().chart_options(this.sensorOptions);
    this.sensorInfo = new Chart(this.sensorcn.nativeElement, sensorOpt);
  }
}
