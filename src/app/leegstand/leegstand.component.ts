import { Component } from "@angular/core";
import { Address } from "./address";
import { OnInit } from "@angular/core";
import { LeegstandService } from "./service/leegstand.service";
@Component({
  selector: 'app-leegstand',
  templateUrl: './leegstand.component.html',
  providers: [LeegstandService]

})

export class LeegstandComponent implements OnInit {
  addresses!: Address[];
  Url = "api/addresses/addresses/1/v1";

  constructor(
    private srv: LeegstandService
    ) {}

    getPosts() : void {
      this.srv.getAddresses(this.Url)
        .subscribe(
          data => console.log(data),
        )
    }

  ngOnInit() {
    this.getPosts()
    }


  addAddress () {

  }
}
