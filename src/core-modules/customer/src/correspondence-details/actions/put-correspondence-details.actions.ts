import { HttpErrorResponse } from '@angular/common/http';
import { createBaseAction, BaseActionType } from '@essent/common';
import { union } from '@ngrx/store';

import { CorrespondenceDetails, PutCorrespondenceDetailsPayload } from '../interfaces';

/** Added this because typescript resolved the 'createBaseAction' to a local path.
 *  When also importing 'BaseActionType' the path is resolved the right way.
 **/
type _localType = BaseActionType<any>;

export const putCorrespondenceDetails = createBaseAction<PutCorrespondenceDetailsPayload>(
    '[CustomerState] Put correspondence details'
);
export const putCorrespondenceDetailsSuccess = createBaseAction<CorrespondenceDetails>(
    '[CustomerState] Put correspondence details success'
);
export const putCorrespondenceDetailsError = createBaseAction<HttpErrorResponse>(
    '[CustomerState] Put correspondence details error'
);
export const putCorrespondenceDetailsClear = createBaseAction('[CustomerState] Put correspondence details clear');

const actions = union({
    putCorrespondenceDetails,
    putCorrespondenceDetailsSuccess,
    putCorrespondenceDetailsError,
    putCorrespondenceDetailsClear
});

export type PutCorrespondenceDetailsUnion = typeof actions;
