import { HttpErrorResponse } from '@angular/common/http';

import { Status } from '../enums/status.enum';

/**
 * Interface that helps maintaining state regarding the Action/ActionSuccess/ActionError format.
 * ```typescript
 * const initialState = {
 *     status: Status.IDLE
 * }
 * function reducer(state = initialState, action): AsyncState<T> {
 *     switch(action.type) {
 *         case ActionType: {
 *            return {
 *               ...state,
 *               status: Status.PENDING
 *            }
 *         }
 *         case ActionSuccessType: {
 *            return {
 *               ...state,
 *               status: Status.SUCCESS,
 *               data: action.payload as T
 *            }
 *         }
 *         case ActionErrorType: {
 *            return {
 *               ...state,
 *               status: Status.ERROR,
 *               error: action.payload as HttpErrorResponse
 *            }
 *         }
 *     }
 * }
 * ```
 */
export interface AsyncState<T> {
    status: Status;
    data?: T;
    error?: HttpErrorResponse;
    actionId?: string;
}
