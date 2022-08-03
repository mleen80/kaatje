import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Address } from "../address";

@Injectable()
export class LeegstandService {


  constructor(
    private http:HttpClient,
  ){}

  getAddresses(): Observable<Address[]>
  {
   return this.http.get<Address[]>("api/addresses/addresses/1/v1")

  }
}
