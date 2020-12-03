import { ExtraOptions } from '@angular/router';

export const routeConfiguration: ExtraOptions = {
  initialNavigation: 'enabled',
  paramsInheritanceStrategy: 'always',
  relativeLinkResolution: 'corrected',
  scrollPositionRestoration: 'enabled',
  onSameUrlNavigation: 'reload',
};
