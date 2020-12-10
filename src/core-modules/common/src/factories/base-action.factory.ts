import { createAction } from '@ngrx/store';

import { BaseActionType } from '../interfaces';

export function createBaseAction<T = void>(type: string) {
    return createAction(type, (params: BaseActionType<T> = { payload: (null as unknown) as T }) => params);
}
