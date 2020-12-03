import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { getCustomer } from '@essent/customer';
import { Store } from '@ngrx/store';

@Injectable()
export class CustomerResolve implements Resolve<string> {
  public constructor(private readonly store: Store<{}>) {}

  public resolve(route: ActivatedRouteSnapshot): string {
    const id: string | null = route.paramMap.get('id');
    if (!id || !/^\d{10}$/.test(id)) {
      throw new Error(`${id} is not a valid accountId`);
    }
    this.store.dispatch(
      getCustomer({
        payload: id,
      })
    );
    return id;
  }
}
