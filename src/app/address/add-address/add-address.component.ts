import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddressService } from 'src/app/api/address/address.service';
import { mapToAddressPayload } from './add-address.mapper';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent {
  extraAddressChecked = false;
  extraEanEChecked = false;
  extraEanGChecked = false;

  addAddress = this.formBuilder.group({
    straat: ['', Validators.required],
    huisnummer: ['', [Validators.required, Validators.pattern("^(0|[1-9][0-9]*)$")]],
    toevoeging: ['', Validators.required],
    postcode: ['', [Validators.required, Validators.pattern("^([1-9]{1}[0-9]{3}\s?[a-zA-Z]{2})$")]],
    woonplaats: ['', Validators.required],
    eanstroom: this.formBuilder.array([['', '']]),
    eangas: ['', [Validators.required, Validators.pattern("^(0|[1-9][0-9]*)$"), Validators.minLength(18)]],
    startdatum: ['', Validators.required],
  })

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private addresService: AddressService) { }

  toOverview(){
    this.router.navigate(['leegstand/:leegstand']);
  }

  onAddExtraAddress(){
    this.extraAddressChecked = true;
  }

  onExtraEan(){
    this.extraEanEChecked = true;
    console.log('ExtraEanEChecked', this.extraEanEChecked);

    const newEanField = document.createElement('input');
    newEanField.setAttribute("type", "text");
    newEanField.setAttribute('formControlName', "eanstroom");
    newEanField.setAttribute("class", "form-control");

    console.log(newEanField);
    document.body.append(newEanField);

  }

  async onSubmit(){
    const mapped = mapToAddressPayload(this.addAddress);
    console.log(mapped);
    await this.addresService.addAddress(mapped);
    this.toOverview();

  }

}
