import { EffectConfiguration, baseEffectFactory, HandleRequestService } from 'core-modules/common';
import { CustomerStatus, getCustomerStatus, getCustomerStatusSuccess, getCustomerStatusError } from '..';
import { GetCustomerStatusService } from '../services/get-customer-status.service';
import { Actions } from '@ngrx/effects';

// tslint:disable:max-classes-per-file

export class GetCustomerStatusEffects {}
export class GetCustomerStatusConfig {}
export const getCustomerStatusEffectConfig: EffectConfiguration<string, CustomerStatus> = {
    requestAction: getCustomerStatus,
    successAction: getCustomerStatusSuccess,
    errorAction: getCustomerStatusError
};
export function getCustomerEffectConfigFactory() {
    return getCustomerStatusEffectConfig;
}

export const getCustomerStatusEffects = [GetCustomerStatusEffects];

export const getCustomerStatusProviders = [
    GetCustomerStatusService,
    { provide: GetCustomerStatusConfig, useFactory: getCustomerEffectConfigFactory },
    {
        provide: GetCustomerStatusEffects,
        useFactory: baseEffectFactory,
        deps: [Actions, HandleRequestService, GetCustomerStatusService, GetCustomerStatusConfig]
    }
];
