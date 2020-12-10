import { HttpErrorResponse } from '@angular/common/http';
import { Actions, createEffect, ofType, OnIdentifyEffects } from '@ngrx/effects';
import { FunctionWithParametersType, TypedAction } from '@ngrx/store/src/models';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BaseActionType, BaseService } from '../interfaces/index';
import { HandleRequestService } from '../services/handle-request.service';

type ActionType<T = unknown> = FunctionWithParametersType<
    [BaseActionType<T>],
    BaseActionType<T> & TypedAction<string>
> &
    TypedAction<string>;

export interface EffectConfiguration<RequestPayload, ResponsePayload> {
    requestAction: ActionType<RequestPayload>;
    successAction: ActionType<ResponsePayload>;
    errorAction: ActionType<HttpErrorResponse>;
}

export function baseEffectFactory<RequestPayload, ResponsePayload>(
    actions$: Actions,
    requestService: HandleRequestService,
    service: BaseService<RequestPayload, ResponsePayload>,
    config: EffectConfiguration<RequestPayload, ResponsePayload>
) {
    return new BaseEffect(actions$, requestService, service, config);
}

export class BaseEffect<Request, Response> implements OnIdentifyEffects {
    public effect$ = createEffect(() =>
        this.requestService.handle(
            this.actions$.pipe(ofType(this.configuration.requestAction)),
            ({ payload, actionId }) =>
                this.dataService.call$(payload).pipe(
                    map(succesPayload =>
                        this.configuration.successAction({
                            actionId,
                            payload: succesPayload
                        })
                    ),
                    catchError(errorPayload =>
                        of(
                            this.configuration.errorAction({
                                actionId,
                                payload: errorPayload
                            })
                        )
                    )
                )
        )
    );

    public ngrxOnIdentifyEffects() {
        return this.configuration.requestAction.type;
    }

    public constructor(
        private readonly actions$: Actions,
        private readonly requestService: HandleRequestService,
        private readonly dataService: BaseService<Request, Response>,
        private readonly configuration: EffectConfiguration<Request, Response>
    ) {}
}
