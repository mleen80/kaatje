import { Component, OnChanges, Output } from "@angular/core";
import { Address } from "../api/address/address";
import { OnInit } from "@angular/core";
import { AddressService } from "../api/address/address.service";
import { Observable } from "rxjs/internal/Observable";
import { Router } from "@angular/router";

@Component({
  selector: 'app-leegstand',
  templateUrl: './leegstand.component.html',
  providers: [AddressService]

})

export class LeegstandComponent implements OnInit{

  addresses$?: Observable<Address[]>

  constructor(
    private addressService: AddressService,
    private router: Router
    ) {}



  ngOnInit() {
     this.addresses$ = this.addressService.getAddresses();

    }

    onAddAddress(){
      this.router.navigate(['address/add-address'])
    }
}
