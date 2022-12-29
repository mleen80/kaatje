import { FormGroup } from '@angular/forms';
import { AddressPayload, Ean } from 'src/app/api/address/address.model';

export function mapToAddressPayload(formGroup: FormGroup): AddressPayload {
  const formValue = formGroup.value;

  const electrictyEans = (formValue.electricityEans as string[])
    .filter(ean => ean !== '')
    .map(code => ({ code, type: 'electricity', status: 'Future' } as Ean));

  const gasEans = (formValue.electricityEans as string[])
    .filter(ean => ean !== '')
    .map(code => ({ code, type: 'gas', status: 'Future' } as Ean));

  return {
    streetName: formValue.straat,
    houseNumber: +formValue.huisnummer,
    houseNumberExtension: formValue.toevoeging ?? '',
    postCode: formValue.postcode,
    city: formValue.woonplaats,
    eans: [
      ...electrictyEans,
      ...gasEans,
    ],
    status: 'Future',
    startDate: formValue.startdatum
  };
}
