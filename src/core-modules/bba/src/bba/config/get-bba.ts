import { Actions } from '@ngrx/effects';
import { baseEffectFactory, EffectConfiguration, HandleRequestService } from 'core-modules/common';

import { BudgetBillAmount } from '..';
import { getBudgetBillAmount, getBudgetBillAmountError, getBudgetBillAmountSuccess } from '../actions/get-bba.actions';
import { GetBBAService } from '../services/get-bba.service';

// tslint:disable:max-classes-per-file

export class GetBBAEffects {}
export class GetBBAConfig {}
export const getBBAEffectConfig: EffectConfiguration<string, BudgetBillAmount> = {
    requestAction: getBudgetBillAmount,
    successAction: getBudgetBillAmountSuccess,
    errorAction: getBudgetBillAmountError
};
export function getBBAEffectConfigFactory() {
    return getBBAEffectConfig;
}

export const getBBAEffects = [GetBBAEffects];

export const getBBAProviders = [
    GetBBAService,
    { provide: GetBBAConfig, useFactory: getBBAEffectConfigFactory },
    {
        provide: GetBBAEffects,
        useFactory: baseEffectFactory,
        deps: [Actions, HandleRequestService, GetBBAService, GetBBAConfig]
    }
];
