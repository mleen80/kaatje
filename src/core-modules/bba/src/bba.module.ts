import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { getBBAEffects, getBBAProviders } from './bba/config/get-bba';
import { API } from './shared';

/**
 * Module containing all providers.
 *
 * ### Example usage
 *
 * #### Normal
 * ```typescript
 * providers: [
 *     BudgetBillAmountModule,
 *     ...
 * ]
 * ```
 *
 * #### Custom API
 *
 * ```typescript
 * providers: [
 *     BudgetBillAmountModule.forRoot({
 *         api: 'https://my-api.com'
 *     }),
 *     ...
 * ]
 * ```
 */
@NgModule({
    imports: [
        EffectsModule.forFeature(getBBAEffects),
    ],
    providers: [
        getBBAProviders
    ]
})
export class BudgetBillAmountCoreModule {
    public constructor(
        @Optional()
        @SkipSelf()
        parentModule: BudgetBillAmountCoreModule
    ) {
        if (parentModule) {
            throw new Error('BudgetBillAmountCoreModule is imported more than once.');
        }
    }

    public static forRoot(config?: { api?: string }): ModuleWithProviders<BudgetBillAmountCoreModule> {
        return {
            ngModule: BudgetBillAmountCoreModule,
            providers: [{ provide: API, useValue: config ? config.api : undefined }]
        };
    }
}
