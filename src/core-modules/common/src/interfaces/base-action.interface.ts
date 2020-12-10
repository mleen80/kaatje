import { RequestStrategy } from '../enums/request-strategy.enum';

/**
 * Interface to replace [BaseAction]{@link BaseAction}
 */
export interface BaseActionType<T> {
    payload: T;
    actionId?: string;
    requestStrategy?: RequestStrategy;
}
