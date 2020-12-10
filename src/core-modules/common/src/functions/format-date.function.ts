import { isNullOrUndefined } from './is-null-or-undefined.function';

/**
 * Converts Data object to a string format.
 */
export function formatDate(date?: Date) {
    if (isNullOrUndefined(date)) {
        return;
    }
    if (!(date instanceof Date) || isNaN(date.getTime())) {
        throw new Error('Invald date supplied');
    }

    return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
}
