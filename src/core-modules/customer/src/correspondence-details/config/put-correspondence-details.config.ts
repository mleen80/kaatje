import { EffectConfiguration, baseEffectFactory, HandleRequestService } from 'core-modules/common';
import {
    PutCorrespondenceDetailsPayload,
    CorrespondenceDetails,
    putCorrespondenceDetails,
    putCorrespondenceDetailsSuccess,
    putCorrespondenceDetailsError
} from '..';
import { Actions } from '@ngrx/effects';
import { PutCorrespondenceDetailsService } from '../services/put-correspondence-details.service';

// tslint:disable:max-classes-per-file

export class PutCorrespondenceDetailsEffects {}
export class PutCorrespondenceDetailsConfig {}
export const putCorrespondenceDetailsEffectConfig: EffectConfiguration<
    PutCorrespondenceDetailsPayload,
    CorrespondenceDetails
> = {
    requestAction: putCorrespondenceDetails,
    successAction: putCorrespondenceDetailsSuccess,
    errorAction: putCorrespondenceDetailsError
};
export function putCorrespondenceDetailsEffectConfigFactory() {
    return putCorrespondenceDetailsEffectConfig;
}

export const putCorrespondenceDetailsEffects = [PutCorrespondenceDetailsEffects];
export const putCorrespondenceDetailsProviders = [
    PutCorrespondenceDetailsService,
    { provide: PutCorrespondenceDetailsConfig, useFactory: putCorrespondenceDetailsEffectConfigFactory },

    {
        provide: PutCorrespondenceDetailsEffects,
        useFactory: baseEffectFactory,
        deps: [Actions, HandleRequestService, PutCorrespondenceDetailsService, PutCorrespondenceDetailsConfig]
    }
];
