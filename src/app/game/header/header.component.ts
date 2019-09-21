import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from "@angular/material/sidenav";

@Component({
  selector: 'cm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input()
  side: MatSidenav;


  constructor() { }

  toggleSide() {
    this.side.toggle();
  }

  ngOnInit() {
  }

}
