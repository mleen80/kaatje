import * as API from './public_api';

/**
 * Tests to prevent breaking changes. If these are changed check if the version is updated according to semantic versioning.
 */
describe('Customer public API', () => {
    const exported = [
        API.getCorrespondenceDetails,
        API.getCorrespondenceDetailsSuccess,
        API.getCorrespondenceDetailsError,
        API.getCorrespondenceDetailsClear,
        API.getCustomer,
        API.getCustomerClear,
        API.getCustomerError,
        API.getCustomerSuccess,
        API.searchCustomer,
        API.searchCustomerClear,
        API.searchCustomerError,
        API.searchCustomerSuccess,
        API.SearchCustomerTypes,
        API.getCustomerStatus,
        API.getCustomerStatusClear,
        API.getCustomerStatusError,
        API.getCustomerStatusSuccess,
        API.SegmentType,
        API.CustomerCoreModule,
        API.LegalEntities,
        API.Gender,
        API.AddressTypes,
        API.putCorrespondenceDetails,
        API.putCorrespondenceDetailsSuccess,
        API.putCorrespondenceDetailsError,
        API.putCorrespondenceDetailsClear,
        API.CommunicationChannels,
        API.API
    ];

    it('should expose all public classes and functions', () => {
        expect(exported).toBeDefined();
        expect(Object.keys(API).length).toBe(
            exported.length,
            `${Object.keys(API)} contains more exported types than specified`
        );
    });

    it('should expose all public interfaces', () => {
        const a:
            | API.CorrespondenceAddress
            | API.PoboxAddress
            | API.StreetAddress
            | API.Correspondence
            | API.CorrespondenceDetails
            | API.Phone
            | API.LegalEntities
            | API.Gender
            | API.Customer
            | API.Person
            | API.Organisation
            | API.CustomerStatus
            | API.GetCorrespondenceDetailsPayload
            | API.PutCorrespondenceDetailsPayload
            | API.PutCorrespondenceDetailsUnion
            | API.PutCorrespondence
            | API.GetCorrespondenceDetailsUnion = {} as any;
        expect(a).toBeDefined();
    });
});
