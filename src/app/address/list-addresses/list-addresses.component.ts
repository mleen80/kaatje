import { Component, Input, OnInit } from '@angular/core';
import { Address } from 'src/app/api/address/address';
import { AddressItemComponent } from 'src/app/address/address-item/address-item.component';
import { uniqueId } from 'lodash'

@Component({
  selector: 'app-list-addresses',
  templateUrl: './list-addresses.component.html',
  styleUrls: ['./list-addresses.component.css'],
})
export class ListAddressesComponent implements OnInit {
  componentId = uniqueId('list-address-accordion-')
  @Input() addresses!: Address[];
  status = ['Active', 'Future', 'Past'];
  panelOpenState = false;
  @Input() header = '';

  constructor() {}

  ngOnInit(): void {}
}
