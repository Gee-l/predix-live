import { Component, OnInit, Input } from '@angular/core';

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

  ngOnInit() {
  }
  sensorsValueChange() {
      const values = [];
      console.log(this.data);
      this.sensors.forEach(function (sensor) {
          if (sensor.active) {
              values.push(sensor.value);
          }
      });

      this.data = values;
  }
}
