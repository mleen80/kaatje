import { ofType, Actions as AllActions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { AbstractControlState, Actions, FormControlState, isNgrxFormsAction, MarkAsSubmittedAction, setValue, ValidationFn } from 'ngrx-forms';
import { required } from 'ngrx-forms/validation';
import { filter } from 'rxjs/operators';

export function enforceNumeric(control: AbstractControlState<string>): FormControlState<string>;
export function enforceNumeric(control: AbstractControlState<string | undefined>): FormControlState<string | undefined>;
export function enforceNumeric(control: AbstractControlState<string | undefined>): FormControlState<string | undefined> {
    return setValue(control, control.value ? control.value.replace(/([^0-9])/g, '') : control.value);
}

export function formatPostcode(control: AbstractControlState<string>): FormControlState<string>;
export function formatPostcode(control: AbstractControlState<string | undefined>): FormControlState<string | undefined>;
export function formatPostcode(control: AbstractControlState<string | undefined>): FormControlState<string | undefined> {
    return setValue(control, control.value ? control.value.replace(/^(\d{4})([a-zA-Z]{2})$/, '$1 $2').toUpperCase() : control.value);
}

export function trim(control: AbstractControlState<string>): FormControlState<string>;
export function trim(control: AbstractControlState<string | undefined>): FormControlState<string | undefined>;
export function trim(control: AbstractControlState<string | undefined>): FormControlState<string | undefined> {
    return setValue(control, control.value ? control.value.replace(/\s/g, '') : control.value);
}

export function toUpperCase(control: AbstractControlState<string>): FormControlState<string>;
export function toUpperCase(control: AbstractControlState<string | undefined>): FormControlState<string | undefined>;
export function toUpperCase(control: AbstractControlState<string | undefined>): FormControlState<string | undefined> {
    return setValue(control, control.value ? control.value.toUpperCase() : control.value);
}

export function emptyWhenDisabled(control: AbstractControlState<string>): FormControlState<string>;
export function emptyWhenDisabled(control: AbstractControlState<string | undefined>): FormControlState<string | undefined>;
export function emptyWhenDisabled(control: AbstractControlState<string | undefined>): FormControlState<string | undefined> {
    return setValue(control, control.isEnabled || control.value === undefined ? control.value : '');
}

export function emptyToUndefined(control: AbstractControlState<string | undefined>): FormControlState<string | undefined> {
    return setValue(control, control.value === '' ? undefined : control.value);
}

export function requiredWhen<T>(condition: boolean): ValidationFn<T> {
    return validateWhen(condition, required);
}

export function validateWhen<T>(condition: boolean, validator: ValidationFn<T>): ValidationFn<T>;
export function validateWhen<T>(condition: boolean, validator: ValidationFn<T>[]): ValidationFn<T>[];
export function validateWhen<T>(condition: boolean, validator: ValidationFn<T> | ValidationFn<T>[]): ValidationFn<T> | ValidationFn<T>[] {
    const noValidator = Array.isArray(validator) ? [] : (_: T) => ({});
    return condition ? validator : noValidator;
}

export function isNgrxFormsActionTyped<T>(action: Action): action is Actions<T> {
    return isNgrxFormsAction(action);
}

export function isFormAction(action: Action, formId: string): boolean {
    return isNgrxFormsActionTyped(action) && action.controlId.startsWith(formId);
}

export const ofFormSubmitAction = (formId: string) => (source$: AllActions) =>
  source$.pipe(
    ofType<MarkAsSubmittedAction>(MarkAsSubmittedAction.TYPE),
    filter((action) => action.controlId === formId)
);
