import { EffectConfiguration, baseEffectFactory, HandleRequestService } from '@essent/common';
import {
    GetCorrespondenceDetailsPayload,
    CorrespondenceDetails,
    getCorrespondenceDetails,
    getCorrespondenceDetailsSuccess,
    getCorrespondenceDetailsError
} from '..';
import { Actions } from '@ngrx/effects';
import { GetCorrespondenceDetailsService } from '../services/get-correspondence-details.service';

// tslint:disable:max-classes-per-file

export class GetCorrespondenceDetailsEffects {}
export class GetCorrespondenceDetailsConfig {}
export const getCorrespondenceDetailsEffectConfig: EffectConfiguration<
    GetCorrespondenceDetailsPayload,
    CorrespondenceDetails
> = {
    requestAction: getCorrespondenceDetails,
    successAction: getCorrespondenceDetailsSuccess,
    errorAction: getCorrespondenceDetailsError
};
export function getCorrespondenceDetailsEffectConfigFactory() {
    return getCorrespondenceDetailsEffectConfig;
}

export const getCorrespondenceDetailsEffects = [GetCorrespondenceDetailsEffects];
export const getCorrespondenceDetailsProviders = [
    GetCorrespondenceDetailsService,
    { provide: GetCorrespondenceDetailsConfig, useFactory: getCorrespondenceDetailsEffectConfigFactory },

    {
        provide: GetCorrespondenceDetailsEffects,
        useFactory: baseEffectFactory,
        deps: [Actions, HandleRequestService, GetCorrespondenceDetailsService, GetCorrespondenceDetailsConfig]
    }
];
