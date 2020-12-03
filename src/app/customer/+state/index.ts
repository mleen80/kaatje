import { InjectionToken } from '@angular/core';
import { Action, ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromCustomer from './reducers/customer.reducer';
import * as fromCustomerForm from './reducers/find-customer-form.reducer';

export const customerSelectorKey = 'customer';

export interface CustomerState {
    readonly customer: fromCustomer.State;
    readonly form: fromCustomerForm.FindCustomerForm;
  }

export const customerReducers: ActionReducerMap<CustomerState, Action & fromCustomerForm.AllowedActions> = {
    customer: fromCustomer.reducer,
    form: fromCustomerForm.reducer,
  };

export const CUSTOMER_FEATURE_REDUCERS = new InjectionToken<
  typeof customerReducers
>('customer Reducers');

export const selectCustomerFeature = createFeatureSelector<CustomerState>(customerSelectorKey);
