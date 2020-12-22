import { Action } from '@ngrx/store';

type UpdateFn<T, A extends Action = Action> = (state: T, action: A) => T;

const applyReducers = <T, A extends Action>(initialState: T, action: A, ...reducers: UpdateFn<T, A>[]): T => {
    return reducers.reduce<T>((state, currentReducer) => currentReducer(state, action), initialState);
};

/**
 * Chain update functions, with `initialState` as starting point.
 * @param initialState Initial state. Also auto binds the type
 * @param action The action to apply to all the functions
 * @param reducer Initial reducer
 * @param reducers Other reducers
 */
export const applyUpdateFns = <T, A extends Action>(initialState: T, action: A, reducer: UpdateFn<T, A>, ...reducers: UpdateFn<T, A>[]) =>
    applyReducers(initialState, action, reducer, ...reducers);

/**
 * Chain update functions, with `initialState` as starting point.
 * @param initialState Initial state. Also auto binds the type
 * @param reducer Initial reducer
 * @param reducers Other reducers
 */
export const chainUpdateFns = <T>(initialState: T, reducer: UpdateFn<T>, ...reducers: UpdateFn<T>[]) =>
    (state: T = initialState, action: Action) => applyReducers(state, action, reducer, ...reducers);
