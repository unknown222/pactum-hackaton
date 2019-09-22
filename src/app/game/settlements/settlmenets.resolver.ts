import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { GameService } from "../game.service";
import { switchMap, tap } from "rxjs/operators";

@Injectable()
export class SettlementsResolver implements Resolve<any> {

    constructor(private game: GameService,
                private router: Router) {
    }

    resolve(route: ActivatedRouteSnapshot) {
        return this.game.getIsLoggedIn().pipe(tap(result => {
                if (!result) {
                    this.router.navigate([ '/login' ]);
                }
            }),
            switchMap(() => {
                return this.game.getOwnSettlements();
            })
        )
    }
}
