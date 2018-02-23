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
import {MatTooltipModule, MatTabsModule, MatToolbarModule, MatIconModule, MatMenuModule, MatListModule} from '@angular/material';
import { SensorsPopupComponent } from './sensors-popup/sensors-popup.component';
import { SensorinfoComponent } from './sensorinfo/sensorinfo.component';
import { RouterModule } from '@angular/router';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { FarmMenuComponent } from './farm-menu/farm-menu.component';
import { DxBarGaugeModule, DxCheckBoxModule } from 'devextreme-angular';
import { FarmGaugeComponent } from './farm-gauge/farm-gauge.component';

@NgModule({
  declarations: [
    AppComponent,
    VisualiserComponent,
    SensorsPopupComponent,
    SensorinfoComponent,
    FarmMenuComponent,
    FarmGaugeComponent
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
      MatListModule,
      BrowserAnimationsModule,
      DxBarGaugeModule,
      DxCheckBoxModule,
      AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCcSfSqyWy0Yan5O-ReitEGoLZ1Y2GtMLg'
    }),
      RouterModule.forRoot([
          {
              path: 'details/:node/:nodeName',
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
