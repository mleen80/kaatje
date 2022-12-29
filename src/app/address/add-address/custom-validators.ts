import { Validators } from '@angular/forms';

export const CustomValidators = {
  numeric: Validators.pattern('^[0-9]*$'),
  postalCode: Validators.pattern('^|([1-9]{1}[0-9]{3}\s?[a-zA-Z]{2})$'),
};
