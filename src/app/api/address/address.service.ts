import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Address } from "./address";

@Injectable()
export class AddressService {


  constructor(
    private http:HttpClient,
  ){}

  getAddresses()
  {
   return this.http.get<Address[]>("api/addresses/addresses/v1")

  }

  // onAddExtraAddress(){
  // }

}
