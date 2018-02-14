import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { VisualiserComponent } from './visualiser/visualiser.component';
import { NodesEndpointService } from './nodes-endpoint.service';


@NgModule({
  declarations: [
    AppComponent,
    VisualiserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [NodesEndpointService],
  bootstrap: [AppComponent]
})
export class AppModule { }
