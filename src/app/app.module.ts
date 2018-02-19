import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { VisualiserComponent } from './visualiser/visualiser.component';
import { NodesEndpointService } from './nodes-endpoint.service';
import { AgmCoreModule  } from '@agm/core';
import 'hammerjs';
import { MatToolbarModule, MatIconModule, MatMenuModule, MatButtonModule, MatDialogModule } from '@angular/material';
import { SensorsPopupComponent } from './sensors-popup/sensors-popup.component';


@NgModule({
  declarations: [
    AppComponent,
    VisualiserComponent,
    SensorsPopupComponent
  ],
  imports: [
      BrowserModule,
      HttpClientModule,
      MatToolbarModule,
      MatIconModule,
      MatMenuModule,
      MatButtonModule,
      MatDialogModule,
      BrowserAnimationsModule,
      AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCcSfSqyWy0Yan5O-ReitEGoLZ1Y2GtMLg'
    })
  ],
  providers: [NodesEndpointService],
  bootstrap: [AppComponent]
})
export class AppModule { }
