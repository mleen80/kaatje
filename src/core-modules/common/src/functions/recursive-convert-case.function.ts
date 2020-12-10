import _camelCase from 'lodash/camelCase';
import _forEach from 'lodash/forEach';
import _isArray from 'lodash/isArray';
import _isPlainObject from 'lodash/isPlainObject';

export const recursiveKeysConvertCase = (convertFunc: (s: string | undefined) => string) => (input: any): any => {
    if (_isArray(input)) {
        return input.map(recursiveKeysConvertCase(convertFunc));
    } else if (_isPlainObject(input)) {
        const newObj: { [key: string]: any } = {};
        Object.keys(input).forEach(key => {
            const newKey = convertFunc(key);
            newObj[newKey] = recursiveKeysConvertCase(convertFunc)(input[key]);
        });
        return newObj;
    }
    return input;
};
