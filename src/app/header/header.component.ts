import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})

export class HeaderComponent implements OnInit{

constructor( private router: Router,
  private route: ActivatedRoute
  ) {}


  ngOnInit() {

  }
}
