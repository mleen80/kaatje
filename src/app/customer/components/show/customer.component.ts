import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { State } from '../../+state/reducers/customer.reducer';
import { selectCustomerState } from '../../+state/selectors/customer.selectors';

@Component({
  templateUrl: './customer.component.html',
})
export class CustomerComponent {
  public customerState$ = this.store.pipe(select(selectCustomerState));

  public constructor(private readonly store: Store<State>) {}
}
