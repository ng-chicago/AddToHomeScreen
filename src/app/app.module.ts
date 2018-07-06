import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { A2hsService } from './a2hs.service';
import { A2hsComponent } from './a2hs/a2hs.component';
import { A2hsBrowserPromptComponent } from './a2hs-browser-prompt/a2hs-browser-prompt.component';
import { A2hsSafariHow2 } from './a2hs-ios-safari-how2/a2hs-ios-safari-how2';


@NgModule({
  declarations: [
    AppComponent,
    A2hsComponent,
    A2hsBrowserPromptComponent,
    A2hsSafariHow2
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [A2hsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
