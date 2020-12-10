import { toHttpParams } from './to-http-params.function';

describe('To HttpParams fn', () => {
    it('should map any object to HttpParams', () => {
        const obj = { foo: 'bar' };
        const params = toHttpParams(obj);
        expect(params.get('foo')).toEqual('bar');
    });

    it('should not map any object members with value undefined to HttpParams', () => {
        const obj = { foo: undefined };
        const params = toHttpParams(obj);
        expect(params.get('foo')).toBeNull();
    });

    it(`should not map any object members with value '' to HttpParams`, () => {
        const obj = { foo: '' };
        const params = toHttpParams(obj);
        expect(params.get('foo')).toBeNull();
    });
});
