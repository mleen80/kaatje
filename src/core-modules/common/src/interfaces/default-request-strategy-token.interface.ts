import { InjectionToken } from '@angular/core';

import { RequestStrategy } from '../enums';

export const DEFAULT_REQUEST_STRATEGY = new InjectionToken<RequestStrategy>('default_request_strategy');
