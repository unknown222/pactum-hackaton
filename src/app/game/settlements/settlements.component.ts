import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl } from "@angular/forms";
import { GameService } from "../game.service";

@Component({
    selector: 'cm-settlements',
    templateUrl: './settlements.component.html',
    styleUrls: [ './settlements.component.scss' ]
})
export class SettlementsComponent implements OnInit {

    settlements: Array<string>;

    name: FormControl = new FormControl();

    constructor(private route: ActivatedRoute,
                private game: GameService,
                private router: Router) {
    }

    goToSettlement(name) {
        this.router.navigate([ name ], { relativeTo: this.route });
    }

    createNewSettlement() {
        this.game.createSettlement(this.name.value).subscribe(_ => {
            this.router.navigate([ this.name.value ], { relativeTo: this.route });
        })
    }


    ngOnInit() {
        this.route.data.subscribe(({ settlements }) => {
            this.settlements = settlements;
        })
    }

}
