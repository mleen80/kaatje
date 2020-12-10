/**
 * @td
 * API technical debt.
 * Currently there is no support for distinguishing an object from an array with 1 element.
 * This util function makes sure that an array is returned.
 */
export function ensureArray<T>(data: T | T[] | undefined): T[] {
    if (Array.isArray(data)) {
        return data;
    } else if (data == null) {
        return [];
    } else {
        return [data];
    }
}
