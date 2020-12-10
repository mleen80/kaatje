import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { RequestStrategy } from './enums/request-strategy.enum';
import { DEFAULT_REQUEST_STRATEGY } from './interfaces/default-request-strategy-token.interface';

@NgModule()
export class CommonCoreModule {
    public constructor(
        @Optional()
        @SkipSelf()
        parentModule: CommonCoreModule
    ) {
        if (parentModule) {
            throw new Error('CommonCoreModule is imported more than once.');
        }
    }

    public static forRoot(config?: {
        defaultRequestStrategy?: RequestStrategy;
    }): ModuleWithProviders<CommonCoreModule> {
        return {
            ngModule: CommonCoreModule,
            providers: [
                {
                    provide: DEFAULT_REQUEST_STRATEGY,
                    useValue: config ? config.defaultRequestStrategy : undefined
                }
            ]
        };
    }
}
