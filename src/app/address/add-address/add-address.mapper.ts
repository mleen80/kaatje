import { FormGroup } from '@angular/forms';
import { AddressPayload } from 'src/app/api/address/address.model';

export function mapToAddressPayload(formGroup: FormGroup): AddressPayload {
  return {
    streetName: formGroup.controls.straat.value,
    houseNumber: +formGroup.controls.huisnummer.value,
    houseNumberExtension: formGroup.controls.toevoeging.value ?? '',
    postCode: formGroup.controls.postcode.value,
    city: formGroup.controls.woonplaats.value,
    eans: [
      {
        type: 'electricity',
        code: formGroup.controls.eanstroom.value,
        status: 'Future'
      },
      {
        type: 'gas',
        code: formGroup.controls.eangas.value,
        status: 'Future'
      }
    ],
    status: 'Future',
    startDate: formGroup.controls.startdatum.value,
  };
}
