import { isNullOrUndefined } from './is-null-or-undefined.function';

/**
 * Converts null values of an object (1 level deep) to undefined for consistency purposes.
 */
export function convertNullMembersToUndefined<T>(object: T): T {
    Object.keys(object)
        .filter(key => isNullOrUndefined((object as any)[key]))
        .forEach(key => {
            (object as any)[key] = undefined;
        });
    return object;
}
