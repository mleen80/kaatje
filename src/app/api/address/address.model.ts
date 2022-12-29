export interface AddressPayload {
  streetName: string;
  houseNumber: number;
  houseNumberExtension: string;
  postCode: string;
  city: string;
  eans: Ean[];
  status: ActiveType;
  startDate: string;
}

export interface Address extends AddressPayload {
  accountId: string;
  id: number;
}

export interface Ean {
type: 'gas' | 'electricity';
code: string;
status: ActiveType;
}

export type ActiveType = 'Active' | 'Past' | 'Future';
