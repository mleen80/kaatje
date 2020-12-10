import { of } from 'rxjs';

import { camelCase, toCamelcase } from './camelcase.function';

const snakeCase = {
    first_name: 'David',
    lastName: 'Sherman',
    address: { street_name: 'Leeghwater' },
    pets: [{ pet_name: 'Loekie' }, { pet_name: 'Smokey' }]
};

const expected = {
    firstName: 'David',
    lastName: 'Sherman',
    address: {
        streetName: 'Leeghwater'
    },
    pets: [{ petName: 'Loekie' }, { petName: 'Smokey' }]
};

const arrayInput = [snakeCase, snakeCase];
const expectedArray = [expected, expected];

describe('Camelcase', () => {
    it('Should camelcase a deeply nested input object', () => {
        const camelCased = camelCase<typeof expected>(snakeCase);
        expect(camelCased).toEqual(expected);
    });

    it('Should camelcase a deeply nested input object with options', () => {
        const camelCased = camelCase<typeof expected>(snakeCase);
        expect(camelCased).toEqual(expected);
    });
    it('Should snakecase an array as root', () => {
        const camelCased = camelCase<typeof expectedArray>(arrayInput);
        expect(camelCased).toEqual(expectedArray);
    });
    it('Should transform to camelcase with a pipeable operator', done => {
        of(snakeCase)
            .pipe(toCamelcase<typeof expected>())
            .subscribe(camelCased => {
                expect(camelCased).toEqual(expected);
                done();
            });
    });

    it('Should transform to camelcase with a pipeable operator with options', done => {
        of(snakeCase)
            .pipe(toCamelcase<typeof expected>())
            .subscribe(camelCased => {
                expect(camelCased).toEqual(expected);
                done();
            });
    });
});
