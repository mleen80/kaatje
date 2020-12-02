import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AsyncModule } from '../async/async.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AsyncModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
