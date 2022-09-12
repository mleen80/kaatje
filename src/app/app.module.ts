import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { CoreModule } from './core/core.module';
import { HeaderComponent } from './header/header.component';
import { LeegstandComponent } from './leegstand/leegstand.component';
import { ListAddressesComponent } from './address/list-addresses/list-addresses.component';

@NgModule({
  declarations: [
    AppComponent,
    LeegstandComponent,
    HeaderComponent,
    ListAddressesComponent
  ],
  imports: [
    CoreModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
