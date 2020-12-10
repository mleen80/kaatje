import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import {
    AsyncState,
    BaseAction,
    BaseActionParam,
    BaseEffect,
    CLIENT_KEY,
    CLIENT_SECRET,
    convertNullMembersToUndefined,
    convertStringToEnumValue,
    ensureArray,
    formatDate,
    handleRequestWithStrategy,
    isNullOrUndefined,
    RequestStrategy,
    Status,
    toHttpParams,
    camelCase,
    toCamelcase,
    snakeCase,
    toSnakeCase,
    createAsyncStateReducer,
    clearAll,
    CommonCoreModule,
} from './public_api';

/**
 * Tests to prevent breaking changes. If these are changed check if the version is updated according to semantic versioning.
 */
describe('Public api common', () => {
    describe('Common core module', () => {
        it('should be exposed', () => {
            expect(CommonCoreModule).toBeDefined();
        });
    });
    describe('Common actions public api', () => {
        it('should expose BaseAction', () => {
            expect(new BaseAction()).toBeDefined();
        });
    });
    describe('Common decoders public api', () => {
        it('should expose camelCase', () => {
            expect(camelCase).toBeDefined();
        });
        it('should expose toCamelcase', () => {
            expect(toCamelcase).toBeDefined();
        });
        it('should expose snakeCase', () => {
            expect(snakeCase).toBeDefined();
        });
        it('should expose toSnakeCase', () => {
            expect(toSnakeCase).toBeDefined();
        });
    });

    describe('Common interfaces public api', () => {
        it('should expose BaseActionParam', () => {
            const obj: BaseActionParam<string> = {
                actionId: '',
                payload: '',
                requestStrategy: RequestStrategy.CANCEL
            };
            expect(obj).toBeDefined();
        });

        it('should expose AsyncState', () => {
            const obj: AsyncState<string> = {
                actionId: '',
                data: '',
                error: new HttpErrorResponse({}),
                status: Status.IDLE
            };
            expect(obj).toBeDefined();
        });

        it('should expose CLIENT_KEY and CLIENT_SECRET', () => {
            expect(CLIENT_KEY).toBeDefined();
            expect(CLIENT_SECRET).toBeDefined();
        });
    });

    describe('Common enums public api', () => {
        it('should expose Status', () => {
            expect(Status.IDLE).toBeDefined();
            expect(Status.PENDING).toBeDefined();
            expect(Status.SUCCESS).toBeDefined();
            expect(Status.ERROR).toBeDefined();
            expect(Object.keys(Status).length).toBe(4);
        });

        it('should expose RequestStrategy', () => {
            expect(RequestStrategy.CANCEL).toBeDefined();
            expect(RequestStrategy.PARALLEL).toBeDefined();
            expect(RequestStrategy.SEQUENCE).toBeDefined();
            expect(RequestStrategy.IGNORE).toBeDefined();
            expect(Object.keys(RequestStrategy).length).toBe(4);
        });
    });

    describe('Common functions public api', () => {
        it('should expose convertNullMembersToUndefined', () => {
            expect(convertNullMembersToUndefined).toBeDefined();
        });

        it('should expose toHttpParams', () => {
            expect(toHttpParams).toBeDefined();
        });

        it('should expose handleRequestWithStrategy', () => {
            expect(handleRequestWithStrategy).toBeDefined();
        });

        it('should expose convertStringToEnumValue', () => {
            expect(convertStringToEnumValue).toBeDefined();
        });

        it('should expose formatDate', () => {
            expect(formatDate).toBeDefined();
        });

        it('should expose ensureArray', () => {
            expect(ensureArray).toBeDefined();
        });

        it('should expose isNullOrUndefined', () => {
            expect(isNullOrUndefined).toBeDefined();
        });
    });

    describe('Common services public api', () => {
        beforeEach(() => {
            const providers: any[] = [];
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule],
                providers
            });
        });
    });

    describe('Common effects', () => {
        it('should expose BaseEffect', () => {
            expect(BaseEffect).toBeDefined();
        });
    });

    describe('Common createAsyncreducer', () => {
        it('should expose createAsyncreducer', () => {
            expect(createAsyncStateReducer).toBeDefined();
        });
    });

    describe('Clearall action', () => {
        it('should expose clearall action', () => {
            expect(clearAll).toBeDefined();
        });
    });
});
