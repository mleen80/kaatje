import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class LeegstandService {


  constructor(
    private http:HttpClient,
  ){}

  getAddresses(url:string){
   return this.http.get(url)

  }
}
