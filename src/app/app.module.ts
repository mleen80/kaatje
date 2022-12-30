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
import { AddressItemComponent } from './address/address-item/address-item.component';
import { FilterAddressesPipe } from './filter-addresses.pipe';
import { ModalComponent } from './modal/modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TerminateAddressComponent } from './address/terminate-address/terminate-address.component';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormComponent } from './form/form.component';


@NgModule({
  declarations: [
    AppComponent,
    LeegstandComponent,
    HeaderComponent,
    ListAddressesComponent,
    AddAddressComponent,
    AddressItemComponent,
    FilterAddressesPipe,
    ModalComponent,
    TerminateAddressComponent,
    FormComponent
  ],
  imports: [
    CoreModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatExpansionModule,
    MatCheckboxModule,
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent]
})
export class AppModule {}
