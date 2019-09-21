import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { GameService } from "../game.service";

@Injectable()
export class SettlmenetResolver implements Resolve<any> {

    constructor(private game: GameService) {
    }

    resolve(route: ActivatedRouteSnapshot) {
        return this.game.getSettlementData(route.params.id);
    }
}
