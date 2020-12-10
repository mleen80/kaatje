import { of } from 'rxjs';

import { snakeCase, toSnakeCase } from './snakecase.function';

const expected = {
    first_name: 'David',
    last_name: 'Sherman',
    address: { street_name: 'Leeghwater' },
    pets: [{ pet_name: 'Loekie' }, { pet_name: 'Smokey' }]
};

const camelcase = {
    firstName: 'David',
    last_name: 'Sherman',
    address: {
        streetName: 'Leeghwater'
    },
    pets: [{ petName: 'Loekie' }, { petName: 'Smokey' }]
};

const arrayInput = [camelcase, camelcase];
const expectedArray = [expected, expected];
describe('Snakecase', () => {
    it('Should snakecase a deeply nested input object', () => {
        const snakeCased = snakeCase<typeof expected>(camelcase);
        expect(snakeCased).toEqual(expected);
    });

    it('Should snakecase a deeply nested input object with options', () => {
        const snakeCased = snakeCase<typeof expected>(camelcase);
        expect(snakeCased).toEqual(expected);
    });
    it('Should snakecase an array as root', () => {
        const snakeCased = snakeCase<typeof expectedArray>(arrayInput);
        expect(snakeCased).toEqual(expectedArray);
    });

    it('Should transform to snakecase with a pipeable operator', done => {
        of(camelcase)
            .pipe(toSnakeCase<typeof expected>())
            .subscribe(snakeCased => {
                expect(snakeCased).toEqual(expected);
                done();
            });
    });

    it('Should transform to snakecase with a pipeable operator with options', done => {
        of(camelcase)
            .pipe(toSnakeCase<typeof expected>())
            .subscribe(snakeCased => {
                expect(snakeCased).toEqual(expected);
                done();
            });
    });
});
