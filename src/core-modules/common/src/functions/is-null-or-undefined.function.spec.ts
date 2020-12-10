import { isNullOrUndefined } from './is-null-or-undefined.function';

describe('isNullOrUndefined', () => {
    it('return true for null or undefined', () => {
        let result = isNullOrUndefined(null);
        expect(result).toBeTruthy();
        result = isNullOrUndefined(undefined);
        expect(result).toBeTruthy();
    });

    it('should return false for not undefined', () => {
        const result = isNullOrUndefined({});
        expect(result).toBeFalsy();
    });
});
