import { Inject, Injectable, Optional } from '@angular/core';
import { Action } from '@ngrx/store';
import { merge, Observable } from 'rxjs';
import { concatMap, exhaustMap, filter, map, mergeMap, switchMap, takeUntil } from 'rxjs/operators';

import { RequestStrategy } from '../enums/request-strategy.enum';
import { DEFAULT_REQUEST_STRATEGY, BaseActionType } from '../interfaces/index';

/**
 * @ignore
 */
export type RequestHandler<T> = (params: T) => Observable<Action>;

@Injectable({
    providedIn: 'root'
})
export class HandleRequestService {
    public constructor(
        @Optional()
        @Inject(DEFAULT_REQUEST_STRATEGY)
        private readonly defaultRequestStrategy: RequestStrategy
    ) {}

    public handle<T, U extends BaseActionType<T>>(action$: Observable<U>, requestHandler: RequestHandler<U>): Observable<Action> {
        action$ = action$.pipe(
            map(action =>
                action.requestStrategy
                    ? action
                    : {
                          ...action,
                          requestStrategy: this.defaultRequestStrategy || RequestStrategy.CANCEL
                      }
            )
        );

        const sequence$ = action$.pipe(filter(({ requestStrategy }) => requestStrategy === RequestStrategy.SEQUENCE));
        const parallel$ = action$.pipe(filter(({ requestStrategy }) => requestStrategy === RequestStrategy.PARALLEL));
        const cancel$ = action$.pipe(filter(({ requestStrategy }) => requestStrategy === RequestStrategy.CANCEL));
        const ignore$ = action$.pipe(filter(({ requestStrategy }) => requestStrategy === RequestStrategy.IGNORE));

        return merge(
            sequence$.pipe(concatMap(action => requestHandler(action))),
            parallel$.pipe(mergeMap(action => requestHandler(action))),
            ignore$.pipe(exhaustMap(action => requestHandler(action))),
            cancel$.pipe(
                switchMap(action => {
                    return requestHandler(action).pipe(takeUntil(merge(sequence$, parallel$, ignore$)));
                })
            )
        );
    }
}
