export function isNullOrUndefined<T>(obj?: T | null): obj is null | undefined {
    return obj == null;
}
