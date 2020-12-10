import { TestBed } from '@angular/core/testing';
import { RequestStrategy } from 'core-modules/common';

import { CommonCoreModule } from './common.module';
import { DEFAULT_REQUEST_STRATEGY } from './interfaces';

describe('Common module', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CommonCoreModule]
        }).compileComponents();
    });
    it('should throw an error if the module is provided twice', () => {
        let module = new CommonCoreModule(null as any);
        const expectedError = new Error('CommonCoreModule is imported more than once.');
        expect(() => {
            module = new CommonCoreModule(undefined as any);
        }).not.toThrow(expectedError);

        expect(() => {
            module = new CommonCoreModule(module);
        }).toThrow(expectedError);
    });

    it('should be possible to provide (optional) defaultRequestStrategy', () => {
        let module = CommonCoreModule.forRoot();
        expect(module.ngModule).toBe(CommonCoreModule);
        expect(module.providers).toContain({
            provide: DEFAULT_REQUEST_STRATEGY,
            useValue: undefined
        });

        module = CommonCoreModule.forRoot({ defaultRequestStrategy: RequestStrategy.CANCEL });
        expect(module.ngModule).toBe(CommonCoreModule);
        expect(module.providers).toContain({
            provide: DEFAULT_REQUEST_STRATEGY,
            useValue: RequestStrategy.CANCEL
        });
    });
});
