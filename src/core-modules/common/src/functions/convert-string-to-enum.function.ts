/**
 * Converts string values coming from the server to enum values.
 */
export function convertStringToEnumValue<T>(type: T, value: string, defaultValue: T[keyof T]): T[keyof T];
export function convertStringToEnumValue<T>(type: T, value: string): T[keyof T] | undefined;
export function convertStringToEnumValue<T>(type: T, value: string, defaultValue?: T[keyof T]): T[keyof T] {
    return (
        Object.keys(type)
            .map(key => (type as any)[key])
            .find(typeValue => typeValue === value) || defaultValue
    );
}
