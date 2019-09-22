import { Injectable } from '@angular/core';
import { GameApiService } from "../core/api/game-api.service";
import { PollingHelper } from "../utils/PollingHelper";

@Injectable()
export class GameService {

    polling$;
    public pollingInterval = 2000;

    constructor(private gameApi: GameApiService) {
    }

    getSettlementData(id) {
        return this.gameApi.getSettlementData(id);
    }

    getIsLoggedIn() {
        return this.gameApi.getIsLoggedIn();
    }

    getOwnSettlements() {
        return this.gameApi.getAllPlayerSettlements();
    }

    createSettlement(name) {
        return this.gameApi.createSettlement(name);
    }

    upgradeBuilding(index, name) {
        return this.gameApi.upgradeSettlementBuilding(index, name);
    }

    trainSoldiers(name) {
        return this.gameApi.trainSoldiers(name);
    }

    trainWorkers(name) {
        return this.gameApi.trainWorkers(name);
    }

    getAllSettlements() {
      return this.gameApi.getAllSettlements();
    }

    attack(ownName, attackName) {
      return this.gameApi.attack(ownName, attackName);
    }



    startDataPoling(settlementId) {
        if (this.polling$) {
            this.polling$.unsubscribe();
        }

        this.polling$ = PollingHelper.polling(this.getSettlementData(settlementId), this.pollingInterval);

        return this.polling$;
    };

    stopDataPoling() {
        if (this.polling$) {
            this.polling$.unsubscribe();
        }
    }


}
