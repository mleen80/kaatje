import { Component } from "@angular/core";
import { Address } from "./address";
import { OnInit } from "@angular/core";

@Component({
  selector: 'app-leegstand',
  templateUrl: './leegstand.component.html'

})

export class LeegstandComponent implements OnInit {
  addresses!: Address [];


  constructor() {}

  ngOnInit() {
      this.addresses
  }

  addAddress () {

  }
}
