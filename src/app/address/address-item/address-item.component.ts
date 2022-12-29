import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Address, Ean } from '../../api/address/address.model';



@Component({
  selector: 'app-address-item[address]',
  templateUrl: './address-item.component.html',
  styleUrls: ['./address-item.component.css'],
})
export class AddressItemComponent  {
  @Input()
  address!: Address;
  @Output()
  selectedEans = new EventEmitter<Ean[]>();

  status = ['Active', 'Future', 'Past'];
  panelOpenState = false;

}
