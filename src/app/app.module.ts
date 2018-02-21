import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { VisualiserComponent } from './visualiser/visualiser.component';
import { NodesEndpointService } from './nodes-endpoint.service';
import { AgmCoreModule  } from '@agm/core';
import 'hammerjs';
import {MatButtonModule, MatDialogModule, MatCardModule, MatGridListModule } from '@angular/material';
import {MatTooltipModule, MatTabsModule, MatToolbarModule, MatIconModule, MatMenuModule} from '@angular/material';
import { SensorsPopupComponent } from './sensors-popup/sensors-popup.component';
import { SensorinfoComponent } from './sensorinfo/sensorinfo.component';
import { RouterModule } from '@angular/router';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';


@NgModule({
  declarations: [
    AppComponent,
    VisualiserComponent,
    SensorsPopupComponent,
    SensorinfoComponent
  ],
  imports: [
      BrowserModule,
      HttpClientModule,
      MatToolbarModule,
      MatIconModule,
      MatMenuModule,
      MatButtonModule,
      MatDialogModule,
      MatCardModule,
      MatTabsModule,
      MatGridListModule,
      MatTooltipModule,
      BrowserAnimationsModule,
      AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCcSfSqyWy0Yan5O-ReitEGoLZ1Y2GtMLg'
    }),
      RouterModule.forRoot([
          {
              path: 'details/:node',
              component: SensorinfoComponent
          }
      ]),
      AgmSnazzyInfoWindowModule
  ],
    entryComponents: [
      SensorsPopupComponent
    ],
    providers: [NodesEndpointService],
    bootstrap: [AppComponent]
})
export class AppModule { }
