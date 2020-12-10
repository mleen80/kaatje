import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { BaseService, toHttpParams, snakeCase, toCamelcase } from 'core-modules/common';
import { Observable } from 'rxjs';

import { API } from '../../shared/customer.model';
import { SearchCustomerPayload } from '../interfaces/search-customer-payload.interface';
import { Customer } from '..';

@Injectable()
export class SearchCustomerService implements BaseService<SearchCustomerPayload, Customer[]> {
    private readonly API_VERSION: string = '1';

    public constructor(
        @Optional()
        @Inject(API)
        private readonly apiUrl: string,
        private readonly httpClient: HttpClient
    ) {}

    /**
     * Performs a GET request with query params to `/customers`
     */
    public call$(payload: SearchCustomerPayload): Observable<Customer[]> {
        const params = toHttpParams(snakeCase(payload));
        return this.httpClient
            .get<Customer[]>(`${this.apiUrl || ''}/customer/customers/v${this.API_VERSION}`, {
                params
            })
            .pipe(toCamelcase());
    }
}
