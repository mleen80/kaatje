import { Action } from '@ngrx/store';
import { merge, Observable } from 'rxjs';
import { concatMap, filter, mergeMap, switchMap, takeUntil } from 'rxjs/operators';
import { BaseAction } from '../actions/base.action';
import { RequestStrategy } from '../enums/request-strategy.enum';

/**
 * @ignore
 */
export type RequestHandler<T> = (params: T) => Observable<Action>;

/**
 * Function used in each effect that implements the [RequestStrategy](./enumerations.html#RequestStrategy)
 */
export function handleRequestWithStrategy<T, U extends BaseAction<T>>(
    action$: Observable<U>,
    requestHandler: RequestHandler<U>
) {
    const sequence$ = action$.pipe(filter(({ requestStrategy }) => requestStrategy === RequestStrategy.SEQUENCE));

    const parallel$ = action$.pipe(filter(({ requestStrategy }) => requestStrategy === RequestStrategy.PARALLEL));

    const cancel$ = action$.pipe(filter(({ requestStrategy }) => requestStrategy === RequestStrategy.CANCEL));

    return merge(
        sequence$.pipe(concatMap(action => requestHandler(action))),
        parallel$.pipe(mergeMap(action => requestHandler(action))),
        cancel$.pipe(
            switchMap(action => {
                return requestHandler(action).pipe(takeUntil(merge(sequence$, parallel$)));
            })
        )
    );
}
