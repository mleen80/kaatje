import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { CoreModule } from './core/core.module';
import { Leegstand } from './leegstand/leegstand.component';
@NgModule({
  declarations: [
    AppComponent,
    Leegstand
  ],
  imports: [CoreModule, AppRoutingModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
