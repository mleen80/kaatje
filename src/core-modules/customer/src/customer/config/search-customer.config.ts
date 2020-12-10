import { EffectConfiguration, baseEffectFactory, HandleRequestService } from '@essent/common';
import { SearchCustomerPayload, searchCustomer, searchCustomerSuccess, searchCustomerError } from '..';
import { SearchCustomerService } from '../services/search-customer.service';
import { Actions } from '@ngrx/effects';
import { Customer } from '../interfaces';

// tslint:disable:max-classes-per-file
export class SearchCustomerEffects {}
export class SearchCustomerConfig {}
export const searchCustomerEffectConfig: EffectConfiguration<SearchCustomerPayload, Customer[]> = {
    requestAction: searchCustomer,
    successAction: searchCustomerSuccess,
    errorAction: searchCustomerError
};
export function searchCustomerEffectConfigFactory() {
    return searchCustomerEffectConfig;
}

export const searchCustomerEffects = [SearchCustomerEffects];
export const searchCustomerProviders = [
    SearchCustomerService,
    {
        provide: SearchCustomerConfig,
        useFactory: searchCustomerEffectConfigFactory
    },
    {
        provide: SearchCustomerEffects,
        useFactory: baseEffectFactory,
        deps: [Actions, HandleRequestService, SearchCustomerService, SearchCustomerConfig]
    }
];
