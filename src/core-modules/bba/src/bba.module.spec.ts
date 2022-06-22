import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { Subject } from 'rxjs';

import { GetBBAConfig, getBBAEffectConfig } from './bba/config/get-bba';
import { BudgetBillAmountCoreModule } from './public_api';
import { API } from './shared';

describe('Budget Bill Amount module', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BudgetBillAmountCoreModule,
        HttpClientModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
      ],
      providers: [provideMockActions(new Subject())],
    }).compileComponents();
  });
  it('should throw an error if the module is provided twice', () => {
    let module = new BudgetBillAmountCoreModule(null as any);
    const expectedError = new Error(
      'BudgetBillAmountCoreModule is imported more than once.'
    );
    expect(() => {
      module = new BudgetBillAmountCoreModule(undefined as any);
    }).not.toThrow(expectedError);

    expect(() => {
      module = new BudgetBillAmountCoreModule(module);
    }).toThrow(expectedError);
  });

  it('should have a forRoot to configure the base api url', () => {
    const url = 'https://example.com';
    const module = BudgetBillAmountCoreModule.forRoot({ api: url });
    expect(module.ngModule).toBe(BudgetBillAmountCoreModule);
    expect(module.providers).toContain({
      provide: API,
      useValue: url,
    });
  });

  it('should have a forRoot with optional config', () => {
    const module = BudgetBillAmountCoreModule.forRoot();
    expect(module.ngModule).toBe(BudgetBillAmountCoreModule);
    expect(module.providers).toEqual([
      {
        provide: API,
        useValue: undefined,
      },
    ]);
  });

  it('should provide effect configurations for BBA', () => {
    const getBBAConfig = TestBed.inject(GetBBAConfig);
    expect(getBBAConfig).toBe(getBBAEffectConfig);
  });
});
