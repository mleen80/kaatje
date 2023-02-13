import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Address, Ean } from 'src/app/api/address/address.model';
import { uniqueId, cloneDeep } from 'lodash';

@Component({
  selector: 'app-list-addresses',
  templateUrl: './list-addresses.component.html',
  styleUrls: ['./list-addresses.component.css'],
})
export class ListAddressesComponent {
  componentId = uniqueId('list-address-accordion-');
  @Input()
  addresses!: Address[];

  @Output()
  selectedEans = new EventEmitter<Address[]>();

  status = ['Active', 'Future', 'Past'];

  panelOpenState = false;
  @Input()
  expanded?: boolean;

  @Input()
  header = '';

  selectAddressEan(selectedEanCodes: string[]){
    let selectedAddresses: Address[] = cloneDeep(this.addresses)
    selectedAddresses.forEach(address => {
      address.eans = address.eans.filter(ean => selectedEanCodes.includes(ean.code))
    });
    selectedAddresses = selectedAddresses.filter(address => address.eans.length);
    console.log('selectAddressEan', selectedAddresses);
    this.selectedEans.emit(selectedAddresses);
  }
}
