import { Component, Input, OnInit } from '@angular/core';
import { Address } from 'src/app/api/address/address';


@Component({
  selector: 'app-list-addresses',
  templateUrl: './list-addresses.component.html',
  styleUrls: ['./list-addresses.component.css']
})
export class ListAddressesComponent implements OnInit {
  @Input() addresses!: Address[];
  status = ['Active', 'Future', 'Past'];
  panelOpenState = false;

  constructor() { }

  ngOnInit(): void {
  }

}
