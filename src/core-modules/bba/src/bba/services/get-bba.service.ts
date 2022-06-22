import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { BaseService, toCamelcase } from 'core-modules/common';
import { Observable } from 'rxjs';

import { API } from '../../shared';
import { BudgetBillAmount } from '../interfaces';

@Injectable()
export class GetBBAService implements BaseService<string, BudgetBillAmount> {
    private readonly API_VERSION: string = '1';

    public constructor(
        @Optional()
        @Inject(API)
        private readonly apiUrl: string,
        private readonly httpClient: HttpClient
    ) {}

    public call$(accountId: string): Observable<BudgetBillAmount> {
        const headers = { Accept: 'application/json' };
        const endpoint = `${this.apiUrl || ''}/billing/plans/${accountId}/v${this.API_VERSION}`;
        return this.httpClient.get<any>(endpoint, { headers }).pipe(toCamelcase());
    }
}
