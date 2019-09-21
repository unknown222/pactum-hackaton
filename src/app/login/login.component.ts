import { Component, OnInit } from '@angular/core';
import { GameApiService } from "../core/api/game-api.service";
import { ActivatedRoute, Route, Router } from "@angular/router";

declare const window: any;

@Component({
    selector: 'cm-login',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit {

    isLoggedIn: boolean;

    constructor(private api: GameApiService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    login() {
        this.api.login();
    }

    signOut() {
        this.api.logout();
        this.isLoggedIn = this.isLoggedInCheck();
    }


    ngOnInit() {
        this.api.connect().then(_ => {
            this.isLoggedIn = this.isLoggedInCheck();
        });

        this.route.queryParams.subscribe((params) => {
            if(params.account_id) {
                this.router.navigate(['/settlement'])
            }
        })
    }

    isLoggedInCheck() {
        return window.walletAccount && !!window.walletAccount.getAccountId();
    }

}
