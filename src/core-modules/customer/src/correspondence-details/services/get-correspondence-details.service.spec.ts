import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { camelCase } from 'core-modules/common';
import { default as serverResponse } from '../../../responses/correspondence-details.get.json';

import { API } from '../../shared/customer.model';
import { GetCorrespondenceDetailsService } from './get-correspondence-details.service';

describe('get-correspondence-details service', () => {
    const accountId = '123';

    const baseUrl = `/customer/customers/correspondencedetails/v2`;
    const fullUrl = `${baseUrl}?account_id=${accountId}`;

    let httpTestingController: HttpTestingController;
    let correspondenceDetailsService: GetCorrespondenceDetailsService;

    function setup(config?: { apiUrl: string }) {
        const providers: any[] = [GetCorrespondenceDetailsService];
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
        correspondenceDetailsService = TestBed.inject(GetCorrespondenceDetailsService);
    }

    describe('', () => {
        beforeEach(() => {
            setup();
        });

        afterEach(() => {
            httpTestingController.verify();
        });
        describe('GET', () => {
            it('should build up the url based on account_id', () => {
                correspondenceDetailsService.call$({ accountId }).subscribe();

                const request = httpTestingController.expectOne(fullUrl);

                request.flush(serverResponse);
                expect(request.request.method).toBe('GET');
            });
            it('should decode the get response', done => {
                correspondenceDetailsService.call$({ accountId }).subscribe(response => {
                    expect(response).toEqual(camelCase(serverResponse));
                    done();
                });

                const request = httpTestingController.expectOne(req => {
                    return req.url === baseUrl;
                });

                request.flush(serverResponse);
            });
        });
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
            correspondenceDetailsService.call$({ accountId }).subscribe();

            const request = httpTestingController.expectOne(apiUrl + fullUrl);

            request.flush(serverResponse);
            expect(request.request.url).toBe(apiUrl + baseUrl);
        });
    });
});
