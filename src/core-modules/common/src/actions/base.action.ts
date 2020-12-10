import { Action } from '@ngrx/store';
import { RequestStrategy } from '../enums/request-strategy.enum';
import { BaseActionParam } from '../interfaces/base-action-param.interface';

/**
 * Base for core-module actions.
 */
export class BaseAction<T> implements Action {
    /**
     * Type of the action.
     */
    // @ts-ignore:next-line
    readonly type: string;
    /**
     * Used to distinguish multiple dispatches of the same action.
     *
     * ##### Example:
     *
     * ```typescript
     * store.dispatch(new GetAccount({
     *     payload: {
     *         id: '1',
     *         actionId: 'firstAccount',
     *         requestStrategy: RequestStrategy.PARALLEL
     *     }
     * }));
     *
     * store.dispatch(new GetAccount({
     *     payload: {
     *         id: '2',
     *         actionId: 'secondAccount',
     *         requestStrategy: RequestStrategy.PARALLEL
     *     }
     * }));
     * ```
     *
     * When the actions are processed their Success/Error action will be dispatched with the same actionId and can be distinguished
     * in the reducers:
     *
     * ```typescript
     * function firstAccountReducer(state, action) {
     *     if(action.actionId !== 'firstAccount') {
     *         return state;
     *     }
     *     switch(action.type) {
     *         case GetAccountTypes.SUCCESS: {
     *             ...
     *         }
     *         ...
     *     }
     * }
     * ```
     *
     * ```typescript
     * function secondAccountReducer(state, action) {
     *     if(action.actionId !== 'secondAccount') {
     *         return state;
     *     }
     *     switch(action.type) {
     *         case GetAccountTypes.SUCCESS: {
     *             ...
     *         }
     *         ...
     *     }
     * }
     * ```
     */
    public readonly actionId: string;
    /**
     * Payload of the action:
     * * Data for performing a request.
     * * Data coming back from the server.
     * * HttpError coming back from the server.
     */
    public readonly payload: T;
    /**
     * Each `effect` of a core-module handles the `actions` based on the passed [RequestStrategy]{@link RequestStrategy}
     * The strategy applies to cases where multiple actions **OF THE SAME TYPE** are dispatched.
     */
    public readonly requestStrategy: RequestStrategy;

    public constructor(param: BaseActionParam<T> = {}) {
        /**
         * ng-packagr 2.0.0 targets es2015 and will generate js that calls __spread (coming from 'tslib').
         * This __spread receives 'arguments' (reserved keyword) that cannot be fixed by polyfills in IE
         * and PhantomJS. The undefined check below is the fix with the least amount of impact. Other solution
         * would be to target es5 (which requires a new feature in ng-packagr) but will have other downsides.
         */
        // @ts-ignore:next-line
        const { actionId, payload, requestStrategy } = param[0] ? param[0] : param;
        this.actionId = actionId;
        this.payload = payload;
        this.requestStrategy = requestStrategy ? requestStrategy : RequestStrategy.CANCEL;
    }
}
