import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectFindCustomerForm } from '../../+state/selectors/find-customer.selectors';

@Component({
  templateUrl: './find-customer.component.html',
})
export class FindCustomerComponent {
  public formState$ = this.store.select(selectFindCustomerForm);

  public constructor(private readonly store: Store) {}
}
