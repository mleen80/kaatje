import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CustomerCoreModule } from '@essent/customer';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgrxFormsModule } from 'ngrx-forms';

import { AsyncModule } from '../async/async.module';
import {
  CUSTOMER_FEATURE_REDUCERS,
  customerReducers,
  customerSelectorKey,
} from './+state';
import { CustomerEffects } from './+state/effects/customer.effects';
import { FindCustomerComponent } from './components/find/find-customer.component';
import { CustomerComponent } from './components/show/customer.component';
import { CustomerRoutingModule } from './customer.routing.module';

@NgModule({
  imports: [
    AsyncModule,
    CommonModule,
    NgrxFormsModule,
    CustomerRoutingModule,
    CustomerCoreModule.forRoot({
      api: 'api',
    }),
    StoreModule.forFeature(customerSelectorKey, CUSTOMER_FEATURE_REDUCERS),
    EffectsModule.forFeature([CustomerEffects]),
  ],
  providers: [
    { provide: CUSTOMER_FEATURE_REDUCERS, useValue: customerReducers },
  ],
  declarations: [CustomerComponent, FindCustomerComponent],
})
export class CustomerModule {}
