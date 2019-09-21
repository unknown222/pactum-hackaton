import { Component, OnInit } from '@angular/core';
import { GameApiService } from "./core/api/game-api.service";

@Component({
    selector: 'cm-root',
    template: `
        <router-outlet></router-outlet>
    `,
    styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {

    constructor(private api: GameApiService) {
    }

    async ngOnInit() {
        this.api.connect().then(console.log);
    }
}
