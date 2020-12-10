import _camelCase from 'lodash/camelCase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { recursiveKeysConvertCase } from './recursive-convert-case.function';

const recursiveKeysCamelCase = recursiveKeysConvertCase(_camelCase);

export const camelCase = <T>(value: any) => recursiveKeysCamelCase(value) as T;

export const toCamelcase = <T>() => (source$: Observable<any>) => source$.pipe(map(value => camelCase<T>(value)));
