import { convertStringToEnumValue } from './convert-string-to-enum.function';

describe('Convert string to enum fn', () => {
    enum testEnum {
        FOO = 'foo',
        BAR = 'bar'
    }

    it('should convert string to enum value', () => {
        expect(convertStringToEnumValue(testEnum, 'foo')).toEqual(testEnum.FOO);
    });

    it('should convert unknown string to undefined if no defaultValue is given', () => {
        expect(convertStringToEnumValue(testEnum, 'unknown')).toBeUndefined();
    });

    it('should convert unknown string to defaultValue', () => {
        expect(convertStringToEnumValue(testEnum, 'unknown', testEnum.BAR)).toEqual(testEnum.BAR);
    });
});
