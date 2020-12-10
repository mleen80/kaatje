import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { API } from './shared/customer.model';
import { searchCustomerEffects, searchCustomerProviders } from './customer/config/search-customer.config';
import { getCustomerEffects, getCustomerProviders } from './customer/config/get-customer-config';

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
        EffectsModule.forFeature(searchCustomerEffects),
        EffectsModule.forFeature(getCustomerEffects),
    ],
    providers: [
        searchCustomerProviders,
        getCustomerProviders
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
