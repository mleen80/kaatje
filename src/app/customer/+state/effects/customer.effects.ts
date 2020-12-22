import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { MarkAsUnsubmittedAction } from 'ngrx-forms';
import { switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { ofFormSubmitAction } from '../../../shared/utils/form-reducer.utils';
import { FORM_ID } from '../reducers/find-customer-form.reducer';
import { selectFindCustomerForm } from '../selectors/find-customer.selectors';

@Injectable()
export class CustomerEffects {
  public formState$ = this.store$.select(selectFindCustomerForm);

  public loadCustomerStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofFormSubmitAction(FORM_ID),
      withLatestFrom(this.formState$),
      tap(([_, form]) => this.router.navigate([`/${form.value.accountId}`])),
      switchMap(() => [new MarkAsUnsubmittedAction(FORM_ID)])
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly store$: Store,
    private router: Router
  ) {}
}
