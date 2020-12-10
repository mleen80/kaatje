import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { camelCase } from 'core-modules/common';

import { default as singleServerResponse } from '../../../responses/customer.get.json';
import { default as organisationServerResponse } from '../../../responses/customer.organisation.get.json';
import { API } from '../../shared/customer.model';
import { GetCustomerService } from './get-customer.service';

describe('get-customers service', () => {
    const accountId = '123';

    const endpoint = `/customer/customers/${accountId}/v1`;

    let httpTestingController: HttpTestingController;
    let customersService: GetCustomerService;

    function setup(config?: { apiUrl: string }) {
        const providers: any[] = [GetCustomerService];
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
        customersService = TestBed.inject(GetCustomerService);
    }

    function testDataSet(serverResponse: any, description: string) {
        describe(description, () => {
            it('should build up the url based on account_id', () => {
                customersService.call$(accountId).subscribe();

                const request = httpTestingController.expectOne(endpoint);

                request.flush(serverResponse);
                expect(request.request.method).toBe('GET');
            });
            it('should decode the get response', done => {
                customersService.call$(accountId).subscribe(response => {
                    expect(response).toEqual(camelCase(serverResponse));
                    done();
                });

                const request = httpTestingController.expectOne(req => {
                    return req.url === endpoint;
                });

                request.flush(serverResponse);
            });
        });
    }

    const testCases = [
        { response: singleServerResponse, description: 'get single' },
        { response: organisationServerResponse, description: 'get organisation' }
    ];

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
            customersService.call$(accountId).subscribe();

            const request = httpTestingController.expectOne(apiUrl + endpoint);

            request.flush(singleServerResponse);
            expect(request.request.url).toBe(apiUrl + endpoint);
        });
    });
});
