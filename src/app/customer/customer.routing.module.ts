import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomerComponent, FindCustomerComponent } from './components';
import { CustomerResolve } from './+state/customer.resolve';

const routes: Routes = [
  {
    path: '',
    component: FindCustomerComponent,
    pathMatch: 'full',
  },
  {
    path: ':id',
    component: CustomerComponent,
    resolve: {
      customer: CustomerResolve,
    },
  },
];

@NgModule({
  providers: [CustomerResolve],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
