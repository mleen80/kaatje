import {
  Actions,
  createFormGroupState,
  FormGroupState,
  formStateReducer,
  updateGroup,
  validate,
} from 'ngrx-forms';
import { maxLength, minLength, pattern, required } from 'ngrx-forms/validation';
import { chainUpdateFns } from '../../../shared/utils/apply-update-fns';

import { enforceNumeric } from '../../../shared/utils/form-reducer.utils';
import { NUMERIC } from '../../../shared/utils/pattern.utils';

export const FORM_ID = 'find-customer';

export interface FindCustomerFormValues {
  accountId: string;
}

export type FindCustomerForm = FormGroupState<FindCustomerFormValues>;
export type AllowedActions = Actions<FindCustomerFormValues>;

export const initialFormValues: FindCustomerFormValues = {
  accountId: '0123456789',
};
export const initialFormState = createFormGroupState<FindCustomerFormValues>(
  FORM_ID,
  initialFormValues
);

const validateForm = updateGroup<FindCustomerFormValues>({
  accountId: validate([
    required,
    pattern(NUMERIC),
    minLength(9),
    maxLength(10),
  ]),
});

const updateForm = updateGroup<FindCustomerFormValues>({
  accountId: enforceNumeric,
});

export const reducer = chainUpdateFns(
  initialFormState,
  formStateReducer,
  updateForm,
  validateForm
);
