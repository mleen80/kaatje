import { Component, OnInit, ResolvedReflectiveFactory } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddressService } from 'src/app/api/address/address.service';
import { mapToAddress } from './add-address.mapper';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit {
  addAddress!: FormGroup;
  extraAddressChecked = false;

  constructor(private router: Router,
              private addresService: AddressService) { }

  ngOnInit(): void {
    this.addAddress = new FormGroup({
      'straat': new FormControl(null, Validators.required),
      'huisnummer': new FormControl(null, [Validators.required, Validators.pattern("^(0|[1-9][0-9]*)$")]),
      'toevoeging': new FormControl(null),
      'postcode': new FormControl(null, [Validators.required, Validators.pattern("^([1-9]{1}[0-9]{3}\s?[a-zA-Z]{2})$")]),
      'woonplaats': new FormControl(null, Validators.required),
      'eanstroom': new FormControl(null, [Validators.required, Validators.pattern("^(0|[1-9][0-9]*)$"), Validators.minLength(18)]),
      'eangas': new FormControl(null, [Validators.required, Validators.pattern("^(0|[1-9][0-9]*)$"), Validators.minLength(18)]),
      'startdatum': new FormControl(null, Validators.required)
    })

  }

  toOverview(){
    this.router.navigate(['leegstand/:leegstand']);
  }

  onAddExtraAddress(){
    this.extraAddressChecked = true;
    // console.log(this.extraAddressChecked);
    // console.log(this.addAddress);
  }

  async onSubmit(){
    const mapped = mapToAddress(this.addAddress);
    console.log(mapped);
    await this.addresService.addAddress(mapped);
    this.toOverview();
    // this.addresService.getAddresses().subscribe();

  }

}
