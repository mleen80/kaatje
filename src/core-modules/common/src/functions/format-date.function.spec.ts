import { formatDate } from './format-date.function';

describe('Format date fn', () => {
    it('should map valid date to YYYY-MM-DD format', () => {
        const result = formatDate(new Date('2018/02/01'));
        expect(result).toEqual('2018-02-01');
    });

    it('should return undefined for undefined', () => {
        const result = formatDate(undefined);
        expect(result).toBeUndefined();
    });

    it(`should throw an error for invalid date`, () => {
        const d = new Date('2018-2018-2018');
        expect(() => {
            return formatDate(d);
        }).toThrowError('Invald date supplied');
    });
});
