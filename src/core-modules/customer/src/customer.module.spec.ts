import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { Subject } from 'rxjs';
import { API } from './shared/customer.model';
import { CustomerCoreModule } from './public_api';
import { GetCustomerConfig, getCustomerEffectConfig } from './customer/config/get-customer-config';
import {
    GetCorrespondenceDetailsConfig,
    getCorrespondenceDetailsEffectConfig
} from './correspondence-details/config/get-correspondence-details.config';
import { SearchCustomerConfig, searchCustomerEffectConfig } from './customer/config/search-customer.config';
import {
    GetCustomerStatusConfig,
    getCustomerStatusEffectConfig
} from './customer-status/config/get-customer-status-config';
import {
    PutCorrespondenceDetailsConfig,
    putCorrespondenceDetailsEffectConfig
} from './correspondence-details/config/put-correspondence-details.config';

describe('Customer module', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CustomerCoreModule, HttpClientModule, StoreModule.forRoot({}), EffectsModule.forRoot([])],
            providers: [provideMockActions(new Subject())]
        }).compileComponents();
    });
    it('should throw an error if the module is provided twice', () => {
        let module = new CustomerCoreModule(null as any);
        const expectedError = new Error('CustomerCoreModule is imported more than once.');
        expect(() => {
            module = new CustomerCoreModule(undefined as any);
        }).not.toThrow(expectedError);

        expect(() => {
            module = new CustomerCoreModule(module);
        }).toThrow(expectedError);
    });

    it('should have a forRoot to configure the base api url', () => {
        const url = 'https://example.com';
        const module = CustomerCoreModule.forRoot({ api: url });
        expect(module.ngModule).toBe(CustomerCoreModule);
        expect(module.providers).toContain({
            provide: API,
            useValue: url
        });
    });

    it('should have a forRoot with optional config', () => {
        const module = CustomerCoreModule.forRoot();
        expect(module.ngModule).toBe(CustomerCoreModule);
        expect(module.providers).toEqual([
            {
                provide: API,
                useValue: undefined
            }
        ]);
    });

    it('should provide effect configurations for correspondence', () => {
        const getCorrespondenceDetailsConfig = TestBed.inject(GetCorrespondenceDetailsConfig);
        expect(getCorrespondenceDetailsConfig).toBe(getCorrespondenceDetailsEffectConfig);
    });

    it('should provide effect configurations for PUT correspondence', () => {
        const putCorrespondenceDetailsConfig = TestBed.inject(PutCorrespondenceDetailsConfig);
        expect(putCorrespondenceDetailsConfig).toBe(putCorrespondenceDetailsEffectConfig);
    });

    it('should provide effect configurations for customers', () => {
        const getCustomerConfig = TestBed.inject(GetCustomerConfig);
        expect(getCustomerConfig).toBe(getCustomerEffectConfig);
    });

    it('should provide effect configurations for customer status', () => {
        const getCustomerStatusConfig = TestBed.inject(GetCustomerStatusConfig);
        expect(getCustomerStatusConfig).toBe(getCustomerStatusEffectConfig);
    });

    it('should provide effect configurations for searching for customers', () => {
        const searchCustomerConfig = TestBed.inject(SearchCustomerConfig);
        expect(searchCustomerConfig).toBe(searchCustomerEffectConfig);
    });
});
