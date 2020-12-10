import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { API } from '../../shared/customer.model';
import { SearchCustomerService } from './search-customer.service';
import { SearchCustomerPayload } from '../interfaces';
import { default as response } from '../responses/customer-search-multiple-results.get.json';
import { AddressTypes } from '../enums';

describe('Customer service', () => {
    let httpTestingController: HttpTestingController;
    let customerService: SearchCustomerService;

    function setup(config?: { apiUrl: string }) {
        const providers: any[] = [SearchCustomerService];
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
        customerService = TestBed.inject(SearchCustomerService);
    }

    describe('', () => {
        beforeEach(() => {
            setup();
        });

        afterEach(() => {
            httpTestingController.verify();
        });

        it('should correctly map query params for supply address', () => {
            const payload: SearchCustomerPayload = {
                postcode: '1122AB',
                houseNumber: '1',
                addressType: AddressTypes.SUPPLY
            };
            customerService.call$(payload).subscribe();
            const request = httpTestingController.expectOne(req => req.url === '/customer/customers/v1');
            request.flush(200);
            expect(request.request.urlWithParams).toBe(
                '/customer/customers/v1?postcode=1122AB&house_number=1&address_type=delivery'
            );
        });

        it('should correctly map query params for correspondence address', () => {
            const payload: SearchCustomerPayload = {
                email: 'hallo@essent.nl',
                phoneNumber: '0123456789',
                addressType: AddressTypes.CORRESPONDENCE
            };
            customerService.call$(payload).subscribe();
            const request = httpTestingController.expectOne(req => req.url === '/customer/customers/v1');
            request.flush(200);
            expect(request.request.urlWithParams).toBe(
                '/customer/customers/v1?email=hallo@essent.nl&phone_number=0123456789&address_type=correspondence'
            );
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

        it('should prefix the url with the `API` token if provived', () => {
            customerService.call$({}).subscribe();

            const request = httpTestingController.expectOne(
                req => req.method === 'GET' && req.url === `${apiUrl}/customer/customers/v1`
            );

            request.flush(response);
            expect(request.request.url).toBe(`${apiUrl}/customer/customers/v1`);
        });
    });
});
