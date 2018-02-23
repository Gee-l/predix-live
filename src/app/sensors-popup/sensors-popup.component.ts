import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-sensors-popup',
  templateUrl: './sensors-popup.component.html',
  styleUrls: ['./sensors-popup.component.css']
})
export class SensorsPopupComponent implements OnInit {
  public toggleGraphGauge: boolean;

  constructor(public dialogRef: MatDialogRef<SensorsPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any)  { }
  ngOnInit() {}
  sensorDetails(sensorData) {
    this.toggleGraphGauge = false;
    this.data.sensor = sensorData;
  }
  closeSensorInfo() {
    this.dialogRef.close();
    console.log(this.data);
  }
  public toggleInfo(state) {
    this.toggleGraphGauge = state;
  }
}
