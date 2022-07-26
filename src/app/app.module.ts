import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { CoreModule } from './core/core.module';
import { HeaderComponent } from './header/header.component';
import { Leegstand } from './leegstand/leegstand.component';
@NgModule({
  declarations: [
    AppComponent,
    Leegstand,
    HeaderComponent
  ],
  imports: [CoreModule, AppRoutingModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
