import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sensors-popup',
  templateUrl: './sensors-popup.component.html',
  styleUrls: ['./sensors-popup.component.css']
})
export class SensorsPopupComponent implements OnInit {
  cnms = 0;
  showThis = true;
  public dummyData;

  constructor(public dialogRef: MatDialogRef<SensorsPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any
  , private router: Router)  { }

  ngOnInit() {
    console.log(this.data.sensors);
    this.cnms = this.data.sensors.length <= 3 ? 3 : 4;
  }
  sensorDetails(sensorData) {
    this.showThis = false;
    this.data.sensor = sensorData;
  }
  closeSensorInfo() {
    this.dialogRef.close();
    console.log(this.data);
  }

}
