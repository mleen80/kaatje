import { FormGroup } from '@angular/forms';
import { Address } from 'src/app/api/address/address';

export function mapToAddress(formGroup: FormGroup): Address {
  return {
  streetName: formGroup.controls.straat.value,
  houseNumber: +formGroup.controls.huisnummer.value,
  houseNumberExtension: formGroup.controls.toevoeging.value ?? '',
  postCode: formGroup.controls.postcode.value,
  city: formGroup.controls.woonplaats.value,
  eanElectricity: formGroup.controls.eanstroom.value,
  eanGas: formGroup.controls.eangas.value,
  status: 'Future',
  eanEStatus: 'Future',
  eanGStatus: 'Future',
  startDate: formGroup.controls.startdatum.value
  }
}
