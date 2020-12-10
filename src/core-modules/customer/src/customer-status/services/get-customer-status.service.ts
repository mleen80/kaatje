import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { BaseService, toCamelcase, toHttpParams, snakeCase } from '@essent/common';
import { Observable } from 'rxjs';

import { API } from '../../shared/customer.model';
import { CustomerStatus } from '../interfaces';

@Injectable()
export class GetCustomerStatusService implements BaseService<string, CustomerStatus> {
    private readonly API_VERSION: string = '1';
    private readonly endpoint = `${this.apiUrl || ''}/customer/status/v${this.API_VERSION}`;

    public constructor(
        @Optional()
        @Inject(API)
        private readonly apiUrl: string,
        private readonly httpClient: HttpClient
    ) {}

    public call$(accountId: string): Observable<CustomerStatus> {
        const params = toHttpParams(snakeCase({ accountId }));
        const headers = { Accept: 'application/json' };
        return this.httpClient.get(this.endpoint, { params, headers }).pipe(toCamelcase());
    }
}
