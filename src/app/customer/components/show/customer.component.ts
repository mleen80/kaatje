import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCustomerState } from '../../+state/selectors/customer.selectors';

@Component({
  templateUrl: './customer.component.html',
})
export class CustomerComponent {
  public customerState$ = this.store.select(selectCustomerState);

  public constructor(private readonly store: Store) {}
}
