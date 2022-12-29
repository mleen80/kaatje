import { Component, OnDestroy } from '@angular/core';
import { Address, Ean } from '../api/address/address.model';
import { OnInit } from '@angular/core';
import { AddressService } from '../api/address/address.service';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { FilterAddressesPipe } from '../filter-addresses.pipe';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-leegstand',
  templateUrl: './leegstand.component.html',
  providers: [AddressService],
})
export class LeegstandComponent implements OnInit, OnDestroy {
  addresses$?: Observable<Address[]>;
  closed$ = new Subject<void>();
  selectedAddresses = new Map<Address, Ean[]>();


  constructor(
    private addressService: AddressService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.addresses$ = this.addressService.getAddresses();
  }

  addAddress() {
    this.router.navigate(['address/:add-address']);
  }

  back() {
    this.router.navigate(['']);
  }

  openDialog() {
    this.addresses$?.pipe(takeUntil(this.closed$)).subscribe((addresses) => {
      const activeAdresses = new FilterAddressesPipe().transform(
        addresses,
        'Active'
      );
      this.dialog.open(ModalComponent, { data: { addresses: activeAdresses } });
    });
  }

  selectedEans(addresEanMap: Map<Address, Ean[]>){
    this.selectedAddresses = new Map([...this.selectedAddresses.entries(), ...addresEanMap.entries()])
    console.log(this.selectedAddresses);
  }

  ngOnDestroy() {
    this.closed$.next();
    this.closed$.complete();
  }
}
