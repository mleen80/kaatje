import { HttpErrorResponse } from '@angular/common/http';
import { BaseActionType, createBaseAction } from '@essent/common';
import { union } from '@ngrx/store';

import { Customer } from '../interfaces';

/** Added this because typescript resolved the 'createBaseAction' to a local path.
 *  When also importing 'BaseActionType' the path is resolved the right way.
 **/
type _localType = BaseActionType<any>;

export const getCustomer = createBaseAction<string>('[CustomerState] Get customers by customer id');
export const getCustomerSuccess = createBaseAction<Customer>('[CustomerState] Get customers success');
export const getCustomerError = createBaseAction<HttpErrorResponse>('[CustomerState] Get customers error');
export const getCustomerClear = createBaseAction('[CustomerState] Get customers details clear');

const actions = union({
    getCustomer,
    getCustomerSuccess,
    getCustomerError,
    getCustomerClear
});

export type GetCustomerUnion = typeof actions;
