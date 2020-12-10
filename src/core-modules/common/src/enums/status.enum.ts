/**
 * Status of the HTTP call.
 *
 * Used by:
 * * [AsyncState](../interfaces/AsyncState.html)
 *
 * ## Example
 *
 * ```html
 * <div *ngIf="state$ | async as state">
 *     <div *ngIf="state.status === Status.IDLE">
 *         Waiting to be called
 *     </div>
 *     <div *ngIf="state.status === Status.PENDING">
 *         Loading
 *     </div>
 *     <div *ngIf="state.status === Status.SUCCESS">
 *         Data from server: {{ state.data }}
 *     </div>
 *     <div *ngIf="state.status === Status.ERROR">
 *         Error from server: {{ state.error }}
 *     </div>
 * </div>
 * ```
 */
export enum Status {
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
    PENDING = 'PENDING',
    IDLE = 'IDLE'
}
