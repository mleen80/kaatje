import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressItemComponent } from './address-item/address-item.component';
import { AddAddressComponent } from './address/add-address/add-address.component';
import { routeConfiguration } from './app.model';
import { CustomerComponent } from './customer/components';
import { LeegstandComponent } from './leegstand/leegstand.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./customer/customer.module').then((m) => m.CustomerModule)},
    {path: 'leegstand/:leegstand', component: LeegstandComponent},
    {path: './customer/customer', component: CustomerComponent},
    {path: 'address/:add-address', component: AddAddressComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, routeConfiguration)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
