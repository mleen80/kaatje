import { Observable } from 'rxjs';

export interface BaseService<RequestPayload, ResponsePayload> {
    call$: (param: RequestPayload) => Observable<ResponsePayload>;
}
