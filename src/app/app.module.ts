import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { CoreModule } from './core/core.module';
import { HeaderComponent } from './header/header.component';
import { LeegstandComponent } from './leegstand/leegstand.component';
import { ListAddressesComponent } from './address/list-addresses/list-addresses.component';
import { AddAddressComponent } from './address/add-address/add-address.component';

@NgModule({
  declarations: [
    AppComponent,
    LeegstandComponent,
    HeaderComponent,
    ListAddressesComponent,
    AddAddressComponent
  ],
  imports: [
    CoreModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
