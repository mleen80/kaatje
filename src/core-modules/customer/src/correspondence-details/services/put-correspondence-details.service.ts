import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { BaseService, snakeCase, toHttpParams } from '@essent/common';
import { Observable } from 'rxjs';
import { API } from '../../shared/customer.model';
import { PutCorrespondenceDetailsPayload } from './../interfaces';

@Injectable()
export class PutCorrespondenceDetailsService implements BaseService<PutCorrespondenceDetailsPayload, Object> {
    private readonly API_VERSION: string = '1';
    public constructor(
        @Optional()
        @Inject(API)
        private readonly apiUrl: string,
        private readonly httpClient: HttpClient
    ) {}

    /**
     * Performs a PUT request to `/customer/customers/correspondencedetails/v1`.
     */
    public call$({ accountId, ...data }: PutCorrespondenceDetailsPayload): Observable<Object> {
        const body = snakeCase(data);
        return this.httpClient.put(
            `${this.apiUrl || ''}/customer/customers/correspondencedetails/v${
                this.API_VERSION
            }?account_id=${accountId}`,
            body
        );
    }
}
