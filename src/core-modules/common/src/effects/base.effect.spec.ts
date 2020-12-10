import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable, of, ReplaySubject, Subject, throwError } from 'rxjs';

import { RequestStrategy } from '../enums';
import { createBaseAction } from '../factories/base-action.factory';
import { BaseService } from '../interfaces';
import { HandleRequestService } from '../services';
import { BaseEffect, baseEffectFactory } from './base.effect';

describe('Base effect factory', () => {
    const httpError: HttpErrorResponse = new HttpErrorResponse({
        status: 401,
        statusText: 'Unauthorized'
    });
    const requestAction = createBaseAction<string>('request');
    const successAction = createBaseAction<string>('success');
    const errorAction = createBaseAction<HttpErrorResponse>('error');
    let actions$: Subject<Action>;
    let effects: BaseEffect<string, string>;

    // tslint:disable:max-classes-per-file
    class TestServiceClass implements BaseService<string, string> {
        public call$(param: string): Observable<string> {
            if (param === 'succeed') {
                return of('success!');
            } else {
                return throwError(httpError);
            }
        }
    }
    class TestEffectConfig {}
    class TestService {}

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                HandleRequestService,
                provideMockActions(() => actions$),
                {
                    provide: TestService,
                    useClass: TestServiceClass
                },
                {
                    provide: TestEffectConfig,
                    useValue: {
                        requestAction,
                        successAction,
                        errorAction
                    }
                },
                {
                    provide: BaseEffect,
                    useFactory: baseEffectFactory,
                    deps: [Actions, HandleRequestService, TestService, TestEffectConfig]
                }
            ]
        });

        actions$ = new ReplaySubject();
        effects = TestBed.inject(BaseEffect);
    });

    it('should return request action type on ngrxOnIdentifyEffects', () => {
        expect(effects.ngrxOnIdentifyEffects()).toEqual(requestAction.type);
    });

    it('should translate to successAction on succes from service', () => {
        const spy = jasmine.createSpy('spy');
        effects.effect$.subscribe(spy);

        actions$.next(requestAction({ payload: 'succeed' }));
        expect(spy).toHaveBeenCalledWith(jasmine.objectContaining(successAction({ payload: 'success!' })));
    });

    it('should translate to errorAction on Error from service', () => {
        const spy = jasmine.createSpy('spy');
        effects.effect$.subscribe(spy);

        actions$.next(requestAction({ payload: 'error!' }));
        expect(spy).toHaveBeenCalledWith(jasmine.objectContaining(errorAction({ payload: httpError })));
    });

    it('should map actionId and not map requestStrategy', () => {
        const spy = jasmine.createSpy('spy');
        effects.effect$.subscribe(spy);

        actions$.next(
            requestAction({
                actionId: '12',
                payload: 'succeed',
                requestStrategy: RequestStrategy.CANCEL
            })
        );
        expect(spy).toHaveBeenCalledWith(successAction({ payload: 'success!', actionId: '12' }));
    });
});
