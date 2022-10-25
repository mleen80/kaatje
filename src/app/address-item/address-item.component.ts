import { Component, Input, OnInit } from '@angular/core';
import { Address } from '../api/address/address';

@Component({
  selector: 'app-address-item',
  templateUrl: './address-item.component.html',
  styleUrls: ['./address-item.component.css']
})
export class AddressItemComponent implements OnInit {
  @Input() addresses!: Address[];
  status = ['Active', 'Future', 'Past'];
  panelOpenState = false;

  constructor() { }

  ngOnInit()  {
  }

}
