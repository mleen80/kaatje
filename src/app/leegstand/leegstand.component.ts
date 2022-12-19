import { Component  } from "@angular/core";
import { Address } from "../api/address/address";
import { OnInit } from "@angular/core";
import { AddressService } from "../api/address/address.service";
import { Observable } from "rxjs/internal/Observable";
import { Router } from "@angular/router";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ModalComponent } from "../modal/modal.component";
import { Dialog, DialogRef } from "@angular/cdk/dialog";

@Component({
  selector: 'app-leegstand',
  templateUrl: './leegstand.component.html',
  providers: [AddressService]

})

export class LeegstandComponent implements OnInit{

  addresses$?: Observable<Address[]>


  constructor(
    private addressService: AddressService,
    private router: Router,
    private dialog: MatDialog
    ) {}



  ngOnInit() {
     this.addresses$ = this.addressService.getAddresses();

    }

    addAddress(){
      this.router.navigate(['address/:add-address'])
    }

    back(){
      this.router.navigate([''])
    }

    openDialog() {

    this.dialog.open(ModalComponent);

    }



}
