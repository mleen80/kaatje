import _snakeCase from 'lodash/snakeCase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { recursiveKeysConvertCase } from './recursive-convert-case.function';

const recursiveKeysSnakeCase = recursiveKeysConvertCase(_snakeCase);

export const snakeCase = <T>(value: any) => recursiveKeysSnakeCase(value) as T;

export const toSnakeCase = <T>() => (source$: Observable<any>) => source$.pipe(map(value => snakeCase<T>(value)));
