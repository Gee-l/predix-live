import { Component, OnInit, Input, Inject } from '@angular/core';

@Component({
  selector: 'app-farm-gauge',
  templateUrl: './farm-gauge.component.html',
  styleUrls: ['./farm-gauge.component.css']
})
export class FarmGaugeComponent implements OnInit {
  @Input() startValue: number;
  @Input() endValue: number;
  @Input() data: Array<number>;
  @Input() type: string;
  @Input() precision: number;
  @Input() headerClass: string;
  @Input() header: string;
  @Input() gaugeContainerId: string;
  @Input() gaugeId: string;
  @Input() panelId: string;
  @Input() sensors: Array<any>;
  @Input() diaData: any;
  public ocean: Array<any>;

  constructor() {
    this.startValue = 0;
    this.endValue = 100;
    this.data = [];
    this.type = 'fixedPoint';
    this.precision = 2;
    this.headerClass = 'long-title';
    this.header = '';
    this.gaugeContainerId = 'gauge-demo';
    this.gaugeId = 'gauge';
    this.sensors = [];
    this.panelId = 'panel';
  }
  ngOnInit() {}
  sensorsValueChange() {
      const values = [];
      this.sensors.forEach(function (sensor) {
          if (sensor.active) {
              values.push(sensor.value);
          }
      });
     // values = this._validate_value(values); /*TODO check the error here*/
      this.data = values;
  }
  customizeText(arg) {
    return arg.valueText;
  }
  customTooltip(arg) {
    console.log(arg);
  }
}
