import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { API } from './shared/customer.model';
import { searchCustomerEffects, searchCustomerProviders } from './customer/config/search-customer.config';
import { getCustomerEffects, getCustomerProviders } from './customer/config/get-customer-config';
import {
    getCorrespondenceDetailsEffects,
    getCorrespondenceDetailsProviders
} from './correspondence-details/config/get-correspondence-details.config';
import {
    getCustomerStatusProviders,
    getCustomerStatusEffects
} from './customer-status/config/get-customer-status-config';
import {
    putCorrespondenceDetailsEffects,
    putCorrespondenceDetailsProviders
} from './correspondence-details/config/put-correspondence-details.config';

/**
 * Module containing all providers.
 *
 * ### Example usage
 *
 * #### Normal
 * ```typescript
 * providers: [
 *     CustomerCoreModule,
 *     ...
 * ]
 * ```
 *
 * #### Custom API
 *
 * ```typescript
 * providers: [
 *     CustomerCoreModule.forRoot({
 *         api: 'https://my-api.com'
 *     }),
 *     ...
 * ]
 * ```
 */
@NgModule({
    imports: [
        EffectsModule.forFeature(getCorrespondenceDetailsEffects),
        EffectsModule.forFeature(searchCustomerEffects),
        EffectsModule.forFeature(getCustomerEffects),
        EffectsModule.forFeature(getCustomerStatusEffects),
        EffectsModule.forFeature(putCorrespondenceDetailsEffects)
    ],
    providers: [
        getCorrespondenceDetailsProviders,
        searchCustomerProviders,
        getCustomerProviders,
        getCustomerStatusProviders,
        putCorrespondenceDetailsProviders
    ]
})
export class CustomerCoreModule {
    public constructor(
        @Optional()
        @SkipSelf()
        parentModule: CustomerCoreModule
    ) {
        if (parentModule) {
            throw new Error('CustomerCoreModule is imported more than once.');
        }
    }

    public static forRoot(config?: { api?: string }): ModuleWithProviders<CustomerCoreModule> {
        return {
            ngModule: CustomerCoreModule,
            providers: [{ provide: API, useValue: config ? config.api : undefined }]
        };
    }
}
