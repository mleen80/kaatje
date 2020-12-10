import { HttpErrorResponse } from '@angular/common/http';
import { createBaseAction, Status } from 'core-modules/common';
import { createAction } from '@ngrx/store';

import { createAsyncStateReducer } from './store.utils';

describe('store utils', () => {
    describe('createAsyncStateReducer', () => {
        const getAction = createBaseAction('GET - TRIGGER');
        const getActionSuccess = createBaseAction<string>('GET - SUCCESS');
        const getActionError = createBaseAction<HttpErrorResponse>('GET - ERROR');
        const getActionClear = createBaseAction('GET - CLEAR');
        const clear = createAction('clear');
        const reducer = createAsyncStateReducer(getAction, getActionSuccess, getActionError, [getActionClear, clear]);
        const reducerWithoutArray = createAsyncStateReducer(
            getAction,
            getActionSuccess,
            getActionError,
            getActionClear
        );

        describe('trigger action', () => {
            it('should go to status PENDING when trigger is fired', () => {
                const newState = reducer({ status: Status.IDLE }, getAction());
                expect(newState.status).toBe(Status.PENDING);
                expect(newState.data).toBe(undefined);
                expect(newState.error).toBe(undefined);
                expect(newState.actionId).toBe(undefined);
            });
            it('should map actionId', () => {
                const newState = reducer(
                    { status: Status.IDLE },
                    getAction({ actionId: 'testAction', payload: undefined })
                );
                expect(newState.actionId).toBe('testAction');
            });
        });

        describe('success action', () => {
            it('should go to status PENDING when trigger is fired', () => {
                const newState = reducer({ status: Status.IDLE }, getActionSuccess({ payload: 'test' }));
                expect(newState.status).toBe(Status.SUCCESS);
                expect(newState.data).toBe('test');
                expect(newState.error).toBe(undefined);
                expect(newState.actionId).toBe(undefined);
            });
            it('should map actionId', () => {
                const newState = reducer(
                    { status: Status.IDLE },
                    getActionSuccess({ payload: 'test', actionId: 'testSuccessAction' })
                );
                expect(newState.actionId).toBe('testSuccessAction');
            });
        });

        describe('error action', () => {
            it('should go to status PENDING when trigger is fired', () => {
                const payload: HttpErrorResponse = { message: 'httpError' } as HttpErrorResponse;
                const newState = reducer({ status: Status.IDLE }, getActionError({ payload }));
                expect(newState.status).toBe(Status.ERROR);
                expect(newState.data).toBe(undefined);
                expect(newState.error).toBe(payload);
                expect(newState.actionId).toBe(undefined);
            });
            it('should map actionId', () => {
                const payload: HttpErrorResponse = { message: 'httpError' } as HttpErrorResponse;
                const newState = reducer(
                    { status: Status.IDLE },
                    getActionError({ payload, actionId: 'testErrorAction' })
                );
                expect(newState.actionId).toBe('testErrorAction');
            });
        });

        describe('clear action', () => {
            it('should go to status IDLE when clear is fired', () => {
                let newState = reducer({ status: Status.SUCCESS, data: 'test' }, getActionClear());
                expect(newState.status).toBe(Status.IDLE);
                expect(newState.data).toBe(undefined);
                expect(newState.error).toBe(undefined);
                expect(newState.actionId).toBe(undefined);

                newState = reducer({ status: Status.SUCCESS, data: 'test' }, clear());
                expect(newState.status).toBe(Status.IDLE);
                expect(newState.data).toBe(undefined);
                expect(newState.error).toBe(undefined);
                expect(newState.actionId).toBe(undefined);
            });
        });

        describe('clear action without array', () => {
            it('should go to status IDLE when clear is fired', () => {
                const newState = reducerWithoutArray({ status: Status.SUCCESS, data: 'test' }, getActionClear());
                expect(newState.status).toBe(Status.IDLE);
                expect(newState.data).toBe(undefined);
                expect(newState.error).toBe(undefined);
                expect(newState.actionId).toBe(undefined);
            });
        });
    });
});
