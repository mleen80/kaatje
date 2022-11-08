export interface Address {
  streetName: string;
  houseNumber: number;
  houseNumberExtension: string;
  postCode: string;
  city: string;
  eanElectricity: string;
  eanGas: string;
  status: ActiveType;
  eanEStatus: ActiveType;
  eanGStatus: ActiveType;
  startDate: string;
}

export type ActiveType = 'Active' | 'Past' | 'Future'
