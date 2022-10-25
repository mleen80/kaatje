import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Address } from './address';

@Injectable({ providedIn: 'root' })
export class AddressService {
  constructor(private http: HttpClient) {}

  getAddresses() {
    return this.http.get<Address[]>('api/addresses/addresses/v1');
  }

  async addAddress(address: Address) {
    const result = this.http.post('api/addresses/addresses/v1', address);
    return await lastValueFrom(result);
  }
}
