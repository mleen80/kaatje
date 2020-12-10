import { AddressTypes } from '../enums/address-types.enum';

export interface SearchCustomerPayload {
    addressType?: AddressTypes;
    phoneNumber?: string;
    email?: string;
    houseNumber?: string;
    houseNumberExtension?: string;
    postcode?: string;
}
