import { HttpParams } from '@angular/common/http';

/**
 * Converts key/value pairs to [HttpParams]{@link https://angular.io/api/common/http/HttpParams}
 */
export function toHttpParams(params: { [key: string]: string | undefined }) {
    return Object.keys(params).reduce((httpParams, key) => {
        const value = params[key];

        if (value != null && value !== '') {
            return httpParams.append(key, value);
        }

        return httpParams;
    }, new HttpParams());
}
