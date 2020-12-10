import { Correspondence } from '../../shared/index';

export interface CorrespondenceDetails {
    accountId: string;
    preferredCommunicationChannel?: string;
    correspondence: Correspondence;
}
