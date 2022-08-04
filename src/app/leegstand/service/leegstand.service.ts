import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Address } from "../address";

@Injectable()
export class LeegstandService {


  constructor(
    private http:HttpClient,
  ){}

  getAddresses(): Observable<Address[]>
  {
   return this.http.get<Address[]>("api/addresses/addresses/v1")

  }
}
