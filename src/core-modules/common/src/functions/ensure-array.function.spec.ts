import { ensureArray } from './ensure-array.function';

describe('Ensure Array', () => {
    it('should convert single item to array', () => {
        const obj = {
            foo: null,
            bar: null
        };

        expect(ensureArray(obj)).toEqual([obj]);
    });
    it('should return array untouched', () => {
        const obj = [{ a: true }];

        expect(ensureArray(obj)).toBe(obj);
    });
    it('should handle null & undefined', () => {
        expect(ensureArray(null)).toEqual([]);
        expect(ensureArray(undefined)).toEqual([]);
    });
});
