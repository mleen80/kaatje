import { HttpErrorResponse } from '@angular/common/http';
import { BaseActionType, createBaseAction } from '@essent/common';
import { union } from '@ngrx/store';

import { CustomerStatus } from '../interfaces';

/** Added this because typescript resolved the 'createBaseAction' to a local path.
 *  When also importing 'BaseActionType' the path is resolved the right way.
 **/
type _localType = BaseActionType<any>;

export const getCustomerStatus = createBaseAction<string>('[CustomerState] Get customer status by customer id');
export const getCustomerStatusSuccess = createBaseAction<CustomerStatus>('[CustomerState] Get customer status success');
export const getCustomerStatusError = createBaseAction<HttpErrorResponse>('[CustomerState] Get customer status error');
export const getCustomerStatusClear = createBaseAction('[CustomerState] Get customer status clear');

const actions = union({
    getCustomerStatus,
    getCustomerStatusSuccess,
    getCustomerStatusError,
    getCustomerStatusClear
});

export type GetCustomerStatusUnion = typeof actions;
