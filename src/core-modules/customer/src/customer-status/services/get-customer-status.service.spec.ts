import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { camelCase } from 'core-modules/common';

import { default as customerStatusResponse } from '../responses/customer-status.get.json';
import { API } from '../../shared/customer.model';
import { GetCustomerStatusService } from './get-customer-status.service';

describe('get-customers status service', () => {
    const accountId = '123';

    const baseUrl = `/customer/status/v1`;
    const fullUrl = `/customer/status/v1?account_id=${accountId}`;

    let httpTestingController: HttpTestingController;
    let customersStatusService: GetCustomerStatusService;

    function setup(config?: { apiUrl: string }) {
        const providers: any[] = [GetCustomerStatusService];
        if (config && config.apiUrl) {
            providers.push({
                provide: API,
                useValue: config.apiUrl
            });
        }
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers
        });
        httpTestingController = TestBed.inject(HttpTestingController);
        customersStatusService = TestBed.inject(GetCustomerStatusService);
    }

    function testDataSet(serverResponse: any, description: string) {
        describe(description, () => {
            it('should build up the url based on account_id', () => {
                customersStatusService.call$(accountId).subscribe();

                const request = httpTestingController.expectOne(fullUrl);

                request.flush(serverResponse);
                expect(request.request.method).toBe('GET');
            });
            it('should decode the get response', done => {
                customersStatusService.call$(accountId).subscribe(response => {
                    expect(response).toEqual(camelCase(serverResponse));
                    done();
                });

                const request = httpTestingController.expectOne(req => {
                    return req.url === baseUrl;
                });

                request.flush(serverResponse);
            });
        });
    }

    const testCases = [{ response: customerStatusResponse, description: 'get single' }];

    describe('', () => {
        beforeEach(() => {
            setup();
        });

        afterEach(() => {
            httpTestingController.verify();
        });

        testCases.forEach(testData => testDataSet(testData.response, testData.description));
    });
    describe('', () => {
        const apiUrl = 'http://example.com';

        beforeEach(() => {
            setup({ apiUrl });
        });

        afterEach(() => {
            httpTestingController.verify();
        });
        it('should prefix the url with the `API` token if provided', () => {
            customersStatusService.call$(accountId).subscribe();

            const request = httpTestingController.expectOne(apiUrl + fullUrl);

            request.flush(customerStatusResponse);
            expect(request.request.url).toBe(apiUrl + baseUrl);
        });
    });
});
