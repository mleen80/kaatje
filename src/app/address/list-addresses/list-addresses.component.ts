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

  private selected: Record<string, boolean> = {}

  @Output()
  selectedEans = new EventEmitter<Address[]>();

  status = ['Active', 'Future', 'Past'];

  panelOpenState = false;
  @Input()
  expanded?: boolean;

  @Input()
  header = '';

  addEanCodes(addedEanCodes: Record<string, boolean>){
    this.selected = {...this.selected, ...addedEanCodes}
    const selectedEanCodes = Object.entries(this.selected).filter(([_, selected]) => selected).map(([eanCode]) => eanCode);
    let selectedAddresses: Address[] = cloneDeep(this.addresses)
    selectedAddresses.forEach(address => {
      address.eans = address.eans.filter(ean => selectedEanCodes.includes(ean.code))
    });
    selectedAddresses = selectedAddresses.filter(address => address.eans.length);
    console.log('selectAddressEan', selectedAddresses);
    this.selectedEans.emit(selectedAddresses);
  }
}
