import { Component } from "@angular/core";
import { Address } from "./address";
import { OnInit } from "@angular/core";
import { LeegstandService } from "./service/leegstand.service";
import { Observable } from "rxjs/internal/Observable";
@Component({
  selector: 'app-leegstand',
  templateUrl: './leegstand.component.html',
  providers: [LeegstandService]

})

export class LeegstandComponent implements OnInit {
  // addresses: Address[];
  // addresses: Address[] = [];
  // Url = "api/addresses/addresses/1/v1";
  addresses$: Observable<Address[]> = this.leegstandService.getAddresses();

  constructor(
    private leegstandService: LeegstandService
    ) {}

    // getPosts() : void {
    //   this.leegstandService.getAddresses(this.Url)
    //     .subscribe(
    //       data => this.addresses.push(data)
    //     )
    // }

  ngOnInit() {
    // this.getPosts()
    }


  // addAddress () {

  // }
}
