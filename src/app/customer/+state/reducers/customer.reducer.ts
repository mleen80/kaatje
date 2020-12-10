import { AsyncState, createAsyncStateReducer } from 'core-modules/common';
import {
  Customer,
  getCustomer,
  getCustomerClear,
  getCustomerError,
  getCustomerSuccess,
} from 'core-modules/customer';

export type State = AsyncState<Customer>;

export const reducer = createAsyncStateReducer(
  getCustomer,
  getCustomerSuccess,
  getCustomerError,
  [getCustomerClear]
);
