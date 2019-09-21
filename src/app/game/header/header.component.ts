import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from "@angular/material/sidenav";
import { Settlement } from "../../entities/Settlement";
import { GameApiService } from "../../core/api/game-api.service";

import { Location } from '@angular/common';

@Component({
    selector: 'cm-header',
    templateUrl: './header.component.html',
    styleUrls: [ './header.component.scss' ]
})
export class HeaderComponent implements OnInit {

    @Input()
    side: MatSidenav;

    @Input()
    settlement: Settlement;


    @Input()
    isOwner: boolean;



    constructor(private api: GameApiService,
                private location: Location) {
    }

    toggleSide() {
        this.side.toggle();
    }

    ngOnInit() {

    }

    back() {
        this.location.back();
    }

}
