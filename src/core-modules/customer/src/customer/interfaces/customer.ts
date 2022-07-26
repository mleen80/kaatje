import { SegmentType, LegalEntities } from '../enums';
import { Correspondence } from '../../shared';

/**
 * Customer details of an account.
 */
export interface Customer {
    accountId: string;
    customerSegment: SegmentType;
    person?: Person;
    organization?: Organisation;
    correspondence?: Correspondence;
}

export interface Person {
    lastName: string;
    fullName: string;
    gender: string;
    initials?: string;
    prefix?: string;
    firstName?: string;
    title?: string;
    dateOfBirth?: string;
    vatNumber?: string;
    adress: string;
}

export interface Organisation {
    organisationName: string;
    chamberOfCommerceNumber?: string;
    legalEntity?: LegalEntities;
}
