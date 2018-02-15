import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { VisualiserComponent } from './visualiser/visualiser.component';
import { NodesEndpointService } from './nodes-endpoint.service';
import { AgmCoreModule  } from '@agm/core';

//AIzaSyCcSfSqyWy0Yan5O-ReitEGoLZ1Y2GtMLg
@NgModule({
  declarations: [
    AppComponent,
    VisualiserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCcSfSqyWy0Yan5O-ReitEGoLZ1Y2GtMLg"
    })
  ],
  providers: [NodesEndpointService],
  bootstrap: [AppComponent]
})
export class AppModule { }
