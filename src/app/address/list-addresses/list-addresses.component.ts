import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Address } from 'src/app/api/address/address';

@Component({
  selector: 'app-list-addresses',
  templateUrl: './list-addresses.component.html',
  styleUrls: ['./list-addresses.component.css']
})
export class ListAddressesComponent implements OnInit {
  @Input() addresses!: Address[];

  constructor() { }

  ngOnInit(): void {
  }

}
