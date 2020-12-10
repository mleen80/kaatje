/**
 *
 *  Each `effect` of a core-module handles the `actions` based on the passed `requestStrategy`.
 *  The strategy applies to cases where multiple actions **OF THE SAME TYPE** are dispatched.
 *
 *  Available strategies:
 *
 *  `CANCEL` (default)
 *  ```
 *  Request - X
 *  Request - X
 *  Request - X
 *  Request -------- Response
 *  ```
 *
 * `PARALLEL`
 * ```
 * Request ---------- Response
 * Request ------- Response
 * Request ---------- Response
 * Request ------------- Response
 * ```
 *
 * `SEQUENCE`
 * ```
 * Request --- Response
 * ----------- Request -------- Response
 * ---------------------------- Request -------- Response
 * ```
 *  `IGNORE` (default)
 *  ```
 *  Request -------- Response
 *  Request - X
 *  Request - X
 *  Request - X
 *  ```
 *
 * ##### Example CANCEL:
 * A page in the application displays 1 Account. It is possible for the user to switch from account A to B before A is successfully
 * retrieved. In this case you would like to cancel the first request so its response does not interfere with the second response.
 *
 * ```typescript
 * store.dispatch(new GetAccount({ // <--- Cancelled by the next action
 *     payload: {
 *        id: '1',
 *        requestStrategy: RequestStrategy.CANCEL // <--- Optional
 *
 *     }
 * }));
 *
 * store.dispatch(new GetAccount({ // <--- Completed
 *     payload: {
 *         id: '2',
 *         requestStrategy: RequestStrategy.CANCEL // <--- Optional
 *     }
 * }));
 * ```
 *
 * ##### Example PARALLEL:
 * A page in the application displays 2 Accounts. You don't want the first request to be cancelled if the second is dispatched.
 *
 * ```typescript
 * store.dispatch(new GetAccount({ // <--- Completed
 *     payload: {
 *        id: '1',
 *        requestStrategy: RequestStrategy.PARALLEL
 *     }
 * }));
 *
 * store.dispatch(new GetAccount({ // <--- Completed
 *     payload: {
 *        id: '2',
 *        requestStrategy: RequestStrategy.PARALLEL
 *    }
 * }));
 * ```
 *
 * If these calls should also be ignored like in the previous example, passing an `actionId` would help solving this issue.
 */
export enum RequestStrategy {
    PARALLEL = 'Parallel',
    SEQUENCE = 'Sequence',
    CANCEL = 'Cancel',
    IGNORE = 'Ignore'
}
