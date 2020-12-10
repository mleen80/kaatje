import { HttpErrorResponse } from '@angular/common/http';
import { createBaseAction, BaseActionType } from 'core-modules/common';
import { union } from '@ngrx/store';

import { CorrespondenceDetails, GetCorrespondenceDetailsPayload } from '../interfaces';

/** Added this because typescript resolved the 'createBaseAction' to a local path.
 *  When also importing 'BaseActionType' the path is resolved the right way.
 **/
type _localType = BaseActionType<any>;

export const getCorrespondenceDetails = createBaseAction<GetCorrespondenceDetailsPayload>(
    '[CustomerState] Get correspondence details'
);
export const getCorrespondenceDetailsSuccess = createBaseAction<CorrespondenceDetails>(
    '[CustomerState] Get correspondence details success'
);
export const getCorrespondenceDetailsError = createBaseAction<HttpErrorResponse>(
    '[CustomerState] Get correspondence details error'
);
export const getCorrespondenceDetailsClear = createBaseAction('[CustomerState] Get correspondence details clear');

const actions = union({
    getCorrespondenceDetails,
    getCorrespondenceDetailsSuccess,
    getCorrespondenceDetailsError,
    getCorrespondenceDetailsClear
});

export type GetCorrespondenceDetailsUnion = typeof actions;
