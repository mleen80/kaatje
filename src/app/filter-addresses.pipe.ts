import { Pipe, PipeTransform } from '@angular/core';
import { ActiveType, Address } from './api/address/address.model';

@Pipe({
  name: 'filterAddresses',
})
export class FilterAddressesPipe implements PipeTransform {
  addresses!: Address[];

  transform(address: Address[], status: ActiveType): Address[] {
    return address.filter((address) => address.status === status);
  }
}
