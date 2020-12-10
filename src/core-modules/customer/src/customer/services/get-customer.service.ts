import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { BaseService, toCamelcase } from '@essent/common';
import { Observable } from 'rxjs';

import { API } from '../../shared/customer.model';
import { Customer } from '../interfaces';

@Injectable()
export class GetCustomerService implements BaseService<string, Customer> {
    private readonly API_VERSION: string = '1';

    public constructor(
        @Optional()
        @Inject(API)
        private readonly apiUrl: string,
        private readonly httpClient: HttpClient
    ) {}

    public call$(accountId: string): Observable<Customer> {
        const headers = { Accept: 'application/json' };
        const endpoint = `${this.apiUrl || ''}/customer/customers/${accountId}/v${this.API_VERSION}`;
        return this.httpClient.get<any>(endpoint, { headers }).pipe(toCamelcase());
    }
}
