import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddressService } from '../../api/address/address.service';
import { last } from 'lodash';
import { mapToAddressPayload } from './add-address.mapper';
import { CustomValidators } from './custom-validators';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit {
  extraAddressChecked = false;

  addressForm = this.formBuilder.group({
    straat: ['', Validators.required],
    huisnummer: ['', [Validators.required, CustomValidators.numeric]],
    toevoeging: ['', Validators.required],
    postcode: ['', [Validators.required, CustomValidators.postalCode]],
    woonplaats: ['', Validators.required],
    electricityEans: this.formBuilder.array([]),
    gasEans: this.formBuilder.array([]),
    startdatum: ['', Validators.required],
  })

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private addressService: AddressService) { }


  toOverview() {
    this.router.navigate(['leegstand/:leegstand']);
  }

  onAddExtraAddress() {
    this.extraAddressChecked = true;
  }

  ngOnInit() {
    this.updateEanArray(this.addressForm.controls.electricityEans);
    this.updateEanArray(this.addressForm.controls.gasEans);
  }

  async onSubmit() {
    const mapped = mapToAddressPayload(this.addressForm);
    console.log(mapped);
    await this.addressService.addAddress(mapped);
    this.toOverview();
  }

  onFormChange() {
    this.updateEanArray(this.addressForm.controls.electricityEans);
    this.updateEanArray(this.addressForm.controls.gasEans);
  }

  private updateEanArray(eans: FormArray<FormControl<unknown>>) {
    if (last(eans.value) !== '' || eans.value.length === 0) {
      eans.push(new FormControl(''));
    }
    const lastIndex = eans.value.length - 1
    for (let i = lastIndex; i >= 0; i--) {
      eans.clearValidators();
      if (lastIndex === i) continue;
      if (eans.value[i] === '') eans.removeAt(i);
      else eans.controls[i].addValidators([Validators.required, CustomValidators.numeric, Validators.minLength(18)]);
    }
  }
}
