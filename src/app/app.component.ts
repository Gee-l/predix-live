import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { VisualiserComponent } from './visualiser/visualiser.component';
import {SensorsPopupComponent} from './sensors-popup/sensors-popup.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
    lat = -33.5049805;
    lng = 19.5635469;
    typeId = 'satellite';
    minZoom = 15;
    maxZoom = 17;
    zoom = 17;
    streetControl = false;

  onChoseLocation(e){
    this.lat = e.coords.lat;
    this.lng = e.coords.lng;
    console.log(e);
  }
}
