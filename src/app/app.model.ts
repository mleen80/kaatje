import { ExtraOptions } from '@angular/router';

export const routeConfiguration: ExtraOptions = {
  initialNavigation: 'enabledBlocking',
  paramsInheritanceStrategy: 'always',
  relativeLinkResolution: 'corrected',
  scrollPositionRestoration: 'enabled',
  onSameUrlNavigation: 'reload',
};
