import { EffectConfiguration, baseEffectFactory, HandleRequestService } from 'core-modules/common';
import { Customer, getCustomer, getCustomerSuccess, getCustomerError } from '..';
import { GetCustomerService } from '../services/get-customer.service';
import { Actions } from '@ngrx/effects';

// tslint:disable:max-classes-per-file

export class GetCustomerEffects {}
export class GetCustomerConfig {}
export const getCustomerEffectConfig: EffectConfiguration<string, Customer> = {
    requestAction: getCustomer,
    successAction: getCustomerSuccess,
    errorAction: getCustomerError
};
export function getCustomerEffectConfigFactory() {
    return getCustomerEffectConfig;
}

export const getCustomerEffects = [GetCustomerEffects];

export const getCustomerProviders = [
    GetCustomerService,
    { provide: GetCustomerConfig, useFactory: getCustomerEffectConfigFactory },
    {
        provide: GetCustomerEffects,
        useFactory: baseEffectFactory,
        deps: [Actions, HandleRequestService, GetCustomerService, GetCustomerConfig]
    }
];
