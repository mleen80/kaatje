export interface Data {
  id: string;
  description: string;
  address: Address;
}

export interface Address {
  postcode: string;
  houseNumber: string;
}
