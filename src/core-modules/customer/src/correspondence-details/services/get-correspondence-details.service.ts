import { Injectable, Optional, Inject } from '@angular/core';
import { BaseService, toHttpParams, snakeCase, toCamelcase } from 'core-modules/common';
import { GetCorrespondenceDetailsPayload, CorrespondenceDetails } from '../interfaces';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API } from '../../shared/customer.model';

@Injectable()
export class GetCorrespondenceDetailsService
    implements BaseService<GetCorrespondenceDetailsPayload, CorrespondenceDetails> {
    private readonly API_VERSION: string = '2';
    private readonly endpoint = `${this.apiUrl || ''}/customer/customers/correspondencedetails/v${this.API_VERSION}`;

    public constructor(
        @Optional()
        @Inject(API)
        private readonly apiUrl: string,
        private readonly httpClient: HttpClient
    ) {}

    public call$(payload: GetCorrespondenceDetailsPayload): Observable<CorrespondenceDetails> {
        const headers = { Accept: 'application/json' };
        const params = toHttpParams(snakeCase(payload));
        return this.httpClient.get<any>(this.endpoint, { params, headers }).pipe(toCamelcase());
    }
}
