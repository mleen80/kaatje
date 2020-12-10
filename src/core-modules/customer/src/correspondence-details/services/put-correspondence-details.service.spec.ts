import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { snakeCase } from 'core-modules/common';

import {
    CommunicationChannels,
    CorrespondenAddressWithoutCountryCode,
    PutCorrespondenceDetailsPayload
} from '../interfaces';
import { PutCorrespondenceDetailsService } from './put-correspondence-details.service';
import { API } from '../../shared/customer.model';

describe('PutCorrespondenceDetailsService', () => {
    const id = '123';
    const address = {
        street: 'test street',
        postcode: '1234AB',
        city: 'test city'
    };
    const streetAddress: CorrespondenAddressWithoutCountryCode = {
        ...address,
        houseNumber: '3'
    };
    const poAddress: CorrespondenAddressWithoutCountryCode = {
        ...address,
        pobox: 'test po box'
    };
    const preferredCommunicationChannel = CommunicationChannels.EMAIL;
    const correspondence = {
        email: 'test@test.nl',
        phone: [{ phoneNumber: '000', primary: true }]
    };
    const streetCorrespondence = {
        ...correspondence,
        address: streetAddress
    };
    const poBoxCorrespondence = {
        ...correspondence,
        address: poAddress
    };
    const streetPayload: PutCorrespondenceDetailsPayload = {
        accountId: id,
        preferredCommunicationChannel,
        correspondence: streetCorrespondence
    };
    const poPayload: PutCorrespondenceDetailsPayload = {
        accountId: id,
        preferredCommunicationChannel,
        correspondence: poBoxCorrespondence
    };
    const url = `/customer/customers/correspondencedetails/v1?account_id=${id}`;

    let httpTestingController: HttpTestingController;
    let putCorrespondenceService: PutCorrespondenceDetailsService;

    function setup(config?: { apiUrl: string }) {
        const providers: any[] = [PutCorrespondenceDetailsService];
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
        httpTestingController = TestBed.get(HttpTestingController);
        putCorrespondenceService = TestBed.get(PutCorrespondenceDetailsService);
    }

    describe('', () => {
        beforeEach(() => {
            setup();
        });

        afterEach(() => {
            httpTestingController.verify();
        });

        it('should send the PUT with a street address', () => {
            const spy = jasmine.createSpy('Success spy');
            const { accountId, ...data } = streetPayload;
            putCorrespondenceService.call$(streetPayload).subscribe(spy);

            const request = httpTestingController.expectOne(url);
            expect(request.request.body).toEqual(snakeCase(data));
        });
        it('should send the PUT with a pobox address', () => {
            const spy = jasmine.createSpy('Success spy');
            const { accountId, ...data } = poPayload;
            putCorrespondenceService.call$(poPayload).subscribe(spy);

            const request = httpTestingController.expectOne(url);
            expect(request.request.body).toEqual(snakeCase(data));
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
            putCorrespondenceService.call$(poPayload).subscribe();
            const request = httpTestingController.expectOne(`${apiUrl}${url}`);

            expect(request.request.urlWithParams).toBe(`${apiUrl}${url}`);
        });
    });
});
