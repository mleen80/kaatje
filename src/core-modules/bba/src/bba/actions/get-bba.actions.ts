import { HttpErrorResponse } from '@angular/common/http';
import { createBaseAction } from 'core-modules/common';

import { BudgetBillAmount } from './../interfaces/bba';

export const getBudgetBillAmount = createBaseAction<string>('[BBAState] Get customers BBA');
export const getBudgetBillAmountSuccess = createBaseAction<BudgetBillAmount>('[BBAState] Get customers BBA success');
export const getBudgetBillAmountError = createBaseAction<HttpErrorResponse>('[BBAState] Get customers BBA error');
export const getBudgetBillAmountClear = createBaseAction('[BBAState] Get customers BBA clear');

