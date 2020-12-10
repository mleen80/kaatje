import { HttpErrorResponse } from '@angular/common/http';
import { ActionCreator, createReducer, on } from '@ngrx/store';
import { FunctionWithParametersType, TypedAction } from '@ngrx/store/src/models';
import { BaseActionType, AsyncState } from '../interfaces';
import { Status } from '../enums';

type ActionType<T = unknown> = FunctionWithParametersType<
    [BaseActionType<T>],
    BaseActionType<T> & TypedAction<string>
> &
    TypedAction<string>;
/**
 * Shorthand for basic reducer to implement actions from CoreModules
 *
 * Example implementation:
 * ```typescript
    export const reducer = createAsyncStateReducer(
        getAction,
        getActionSuccess,
        getActionError,
        [getActionClear, clear]
    );
    ```
 **/
export function createAsyncStateReducer<G, T>(
    triggerAction: ActionType<G>,
    successAction: ActionType<T>,
    errorAction: ActionType<HttpErrorResponse>,
    clearAction: ActionCreator | ActionCreator[]
) {
    const initialState = { status: Status.IDLE };
    const clearActions = Array.isArray(clearAction) ? clearAction : [clearAction];
    return createReducer<AsyncState<T>>(
        initialState,
        on(triggerAction, (_, { actionId }) => ({
            actionId,
            status: Status.PENDING
        })),
        on(successAction, (_, { payload, actionId }) => ({
            status: Status.SUCCESS,
            actionId,
            data: payload
        })),
        on(errorAction, (_, { payload, actionId }) => ({
            status: Status.ERROR,
            error: payload,
            actionId
        })),
        ...clearActions.map(a => on(a, () => initialState))
    );
}
