import { HttpErrorResponse } from '@angular/common/http';
import { BaseActionType, createBaseAction } from 'core-modules/common';
import { union } from '@ngrx/store';

import { SearchCustomerPayload } from '../interfaces/search-customer-payload.interface';
import { Customer } from '../interfaces';

/** Added this because typescript resolved the 'createBaseAction' to a local path.
 *  When also importing 'BaseActionType' the path is resolved the right way.
 **/
type _localType = BaseActionType<any>;

// tslint:disable: max-classes-per-file
export enum SearchCustomerTypes {
    SEARCH = '[CustomerState] Search customer',
    SUCCESS = '[CustomerState] Search customer success',
    ERROR = '[CustomerState] Search customer error',
    CLEAR = '[CustomerState] Search customer clear'
}

export const searchCustomer = createBaseAction<SearchCustomerPayload>(SearchCustomerTypes.SEARCH);
export const searchCustomerSuccess = createBaseAction<Customer[]>(SearchCustomerTypes.SUCCESS);
export const searchCustomerError = createBaseAction<HttpErrorResponse>(SearchCustomerTypes.ERROR);
export const searchCustomerClear = createBaseAction(SearchCustomerTypes.CLEAR);

const actions = union({
    searchCustomer,
    searchCustomerSuccess,
    searchCustomerError,
    searchCustomerClear
});

export type SearchCustomerUnion = typeof actions;
