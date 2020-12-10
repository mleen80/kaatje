export interface Correspondence {
    email: string;
    phone: Phone[];
    address?: CorrespondenceAddress;
}

export type CorrespondenceAddress = StreetAddress | PoboxAddress;

export interface StreetAddress {
    houseNumber: string;
    postcode: string;
    houseNumberExtension?: string;
    street: string;
    city: string;
    careOfFullName?: string;
    department?: string;
    countryCode: string;
}

export interface PoboxAddress {
    pobox: string;
    postcode: string;
    city: string;
    careOfFullName?: string;
    department?: string;
    countryCode: string;
}

export interface Phone {
    phoneNumber: string;
    primary: boolean;
}
