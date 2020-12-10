/* tslint:disable:max-classes-per-file */
import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Actions, Effect, EffectsModule, ofType } from '@ngrx/effects';
import { Action, select, Store, StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RequestStrategy } from '../enums/request-strategy.enum';
import { BaseAction } from './base.action';

describe('Base action', () => {
    let store$: Store<any>;

    interface ExampleData {
        data: string;
    }

    const GET_EXAMPLE_DATA = '[State] Get example data';

    class GetExampleData extends BaseAction<ExampleData> {
        type = GET_EXAMPLE_DATA;
    }

    const GET_EXAMPLE_DATA_SUCCESS = '[State] Get example data success';

    class GetExampleDataSuccess extends BaseAction<ExampleData> {
        type = GET_EXAMPLE_DATA_SUCCESS;
    }

    @Injectable()
    class GetExampleDataEffects {
        @Effect() get$: Observable<Action>;

        public constructor(private readonly actions$: Actions) {
            this.get$ = this.actions$.pipe(
                ofType<GetExampleData>(GET_EXAMPLE_DATA),
                map(
                    ({ actionId, payload }: GetExampleData) =>
                        new GetExampleDataSuccess({ actionId: actionId, payload })
                )
            );
        }
    }

    function reducer(state: any = {}, { type, payload, actionId }: BaseAction<unknown>) {
        switch (type) {
            case GET_EXAMPLE_DATA_SUCCESS:
                if (actionId === 'A') {
                    return {
                        ...state,
                        ...{
                            a: {
                                data: payload,
                                actionId
                            }
                        }
                    };
                } else if (actionId === 'B') {
                    return {
                        ...state,
                        ...{
                            b: {
                                data: payload,
                                actionId
                            }
                        }
                    };
                }
        }
        return state;
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({
                    example: reducer
                } as any),
                EffectsModule.forRoot([GetExampleDataEffects])
            ]
        });
        store$ = TestBed.inject(Store);
    });
    it('should not error if nothing is passed to the base action', () => {
        expect(() => new GetExampleData(undefined)).not.toThrow();
    });

    it('should be able to trigger the same action for different actionId in the state', () => {
        const action1 = new GetExampleData({
            actionId: 'A',
            payload: { data: '123' }
        });
        store$.dispatch(action1);
        const action2 = new GetExampleData({
            actionId: 'B',
            payload: { data: '321' }
        });
        store$.dispatch(action2);

        let actionSuccess1;
        store$.pipe(select(s => s.example)).subscribe(s => (actionSuccess1 = s.a));

        let actionSuccess2;
        store$.pipe(select(s => s.example)).subscribe(s => (actionSuccess2 = s.b));

        expect((actionSuccess1 as any).data).toBe(action1.payload);
        expect((actionSuccess2 as any).data).toBe(action2.payload);
    });

    it('should be able to handle an object param if ran by PhantomJS or in IE', () => {
        const action1 = new GetExampleData([
            {
                actionId: 'A'
            }
        ] as any);
        expect(action1.actionId).toEqual('A');
    });

    it('should be able to pass a request strategy', () => {
        const action1 = new GetExampleData({
            requestStrategy: RequestStrategy.SEQUENCE
        });
        expect(action1.requestStrategy).toEqual(RequestStrategy.SEQUENCE);
    });
});
