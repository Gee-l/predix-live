import { Component } from '@angular/core';
import { VisualiserComponent } from './visualiser/visualiser.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  lat = 51.678418
  lng = 7.809007

  onChoseLocation(e){
    this.lat = e.coords.lat;
    this.lng = e.coords.lng;
    console.log(e);
  }
}
