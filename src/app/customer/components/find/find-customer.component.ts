import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../../+state/reducers/customer.reducer';
import { selectFindCustomerForm } from '../../+state/selectors/find-customer.selectors';

@Component({
  templateUrl: './find-customer.component.html',
})
export class FindCustomerComponent {
  public formState$ = this.store.pipe(select(selectFindCustomerForm));

  public constructor(private readonly store: Store<State>) {}
}
