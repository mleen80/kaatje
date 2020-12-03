import { AsyncState, createAsyncStateReducer } from '@essent/common';
import { Customer, getCustomer, getCustomerClear, getCustomerError, getCustomerSuccess } from '@essent/customer';

export type State = AsyncState<Customer>;

export const reducer = createAsyncStateReducer(
  getCustomer,
  getCustomerSuccess,
  getCustomerError,
  [getCustomerClear]
);
