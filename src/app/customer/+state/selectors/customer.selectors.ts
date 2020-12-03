import { selectCustomerFeature } from '../index';
import { createSelector } from '@ngrx/store';

export const selectCustomerState = createSelector(
  selectCustomerFeature,
  (state) => state.customer
);
