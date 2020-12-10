import { Phone, StreetAddress, PoboxAddress } from '../../shared';

export interface PutCorrespondenceDetailsPayload {
    accountId: string;
    preferredCommunicationChannel: CommunicationChannels;
    correspondence: PutCorrespondence;
}

export enum CommunicationChannels {
    EMAIL = 'email',
    LETTER = 'letter'
}

export interface PutCorrespondence {
    email: string;
    phone: Phone[];
    validFrom?: string;
    validTo?: string;
    address: CorrespondenAddressWithoutCountryCode;
}

// In the future we could use Omit if we upgrade the TS version https://stackoverflow.com/questions/48215950/exclude-property-from-type
export type CorrespondenAddressWithoutCountryCode =
    | Pick<StreetAddress, Exclude<keyof StreetAddress, 'countryCode'>>
    | Pick<PoboxAddress, Exclude<keyof PoboxAddress, 'countryCode'>>;
