import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { VisualiserComponent } from './visualiser/visualiser.component';
import { NodesEndpointService } from './nodes-endpoint.service';
import { AgmCoreModule  } from '@agm/core';
import 'hammerjs';
import { MatTabsModule, MatToolbarModule, MatIconModule, MatMenuModule, MatButtonModule, MatDialogModule, MatCardModule, MatGridListModule } from '@angular/material';
import { SensorsPopupComponent } from './sensors-popup/sensors-popup.component';
import { SensorinfoComponent } from './sensorinfo/sensorinfo.component';
import { RouterModule } from '@angular/router';


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
      BrowserAnimationsModule,
      AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCcSfSqyWy0Yan5O-ReitEGoLZ1Y2GtMLg'
    }),
      RouterModule.forRoot([
          {
              path: 'details/:node',
              component: SensorinfoComponent
          }
      ])
  ],
    entryComponents: [
      SensorsPopupComponent
    ],
    providers: [NodesEndpointService],
    bootstrap: [AppComponent]
})
export class AppModule { }
