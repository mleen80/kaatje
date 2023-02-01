import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Address, Ean } from 'src/app/api/address/address.model';
import { uniqueId } from 'lodash';

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
  selectedEans = new EventEmitter<Map<Address, Ean[]>>();

  selectedAddresses = new Map<Address, Ean[]>();

  status = ['Active', 'Future', 'Past'];

  panelOpenState = false;
  @Input()
  expanded?: boolean;

  @Input()
  header = '';

  selectAddressEan(address: Address, eans: Ean[]){
    this.selectedAddresses.set(address, eans);
    this.selectedEans.emit(this.selectedAddresses);
    console.log('lists', address, eans);
  }
}
