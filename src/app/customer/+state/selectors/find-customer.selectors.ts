import { selectCustomerFeature } from '../index';
import { createSelector } from '@ngrx/store';

export const selectFindCustomerForm = createSelector(
  selectCustomerFeature,
  (state) => state.form
);
