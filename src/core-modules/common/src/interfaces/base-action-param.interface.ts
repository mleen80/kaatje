import { RequestStrategy } from '../enums/request-strategy.enum';

/**
 * Interface for params of [BaseAction]{@link BaseAction}
 */
export interface BaseActionParam<T> {
    payload?: T;
    actionId?: string;
    requestStrategy?: RequestStrategy;
}
