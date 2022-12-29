import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { AddressPayload, Address } from './address.model';

@Injectable({ providedIn: 'root' })
export class AddressService {
  constructor(private http: HttpClient) {}

  getAddresses() {
    return this.http.get<Address[]>('api/addresses/addresses/v1');
  }

  async addAddress(address: AddressPayload) {
    const result = this.http.post('api/addresses/addresses/v1', address);
    return await lastValueFrom(result);
  }
}
