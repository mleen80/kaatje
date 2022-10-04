import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { minLength } from 'ngrx-forms/validation';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit {
  addAddress!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.addAddress = new FormGroup({
      'straat': new FormControl(null, Validators.required),
      'huisnummer': new FormControl(null, [Validators.required, Validators.pattern("^(0|[1-9][0-9]*)$")]),
      'toevoeging': new FormControl(null),
      'postcode': new FormControl(null, Validators.required),
      'woonplaats': new FormControl(null, Validators.required),
      'eanstroom': new FormControl(null, [Validators.required, Validators.minLength(18)]),
      'eangas': new FormControl(null, [Validators.required, Validators.minLength(18)]),
      'startdatum': new FormControl(null, Validators.required)
    })
  }


}
