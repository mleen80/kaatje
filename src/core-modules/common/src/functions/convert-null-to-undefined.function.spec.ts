import { convertNullMembersToUndefined } from './convert-null-to-undefined.function';

describe('Convert null to undefined fn', () => {
    it('should convert all null members to undefined', () => {
        const obj = {
            foo: null,
            bar: null
        } as any;

        expect(convertNullMembersToUndefined(obj)).toEqual({
            foo: undefined,
            bar: undefined
        });
    });
});
