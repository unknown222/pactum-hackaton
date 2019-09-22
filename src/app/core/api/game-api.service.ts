import { Injectable, NgZone } from '@angular/core';
import { Observable } from "rxjs";
import { Settlement } from "../../entities/Settlement";
import nearConfig from "./near.config";
import { Report } from "../../entities/Report";

declare const window: any;

@Injectable({
    providedIn: 'root'
})
export class GameApiService {

    constructor(private zone: NgZone) {
    }


    async connect() {
        if (window.contract) return Promise.resolve(window.contract);
        // Initializing connection to the NEAR node.
        window.near = await window.nearlib.connect(Object.assign(nearConfig, { deps: { keyStore: new window.nearlib.keyStores.BrowserLocalStorageKeyStore() } }));
        // Needed to access wallet login
        window.walletAccount = new window.nearlib.WalletAccount(window.near);

        // Initializing our contract APIs by contract name and configuration.
        window.contract = await window.near.loadContract(nearConfig.contractName, {
            viewMethods: [ "getAllSettelments", "getU64", "getSettlement", "getBuilding", "canBuyWorker", "getResources", "getAllPlayerSettelments", "getUpgradePrice", "getBaseBuildPrice", "getAllUpgradePrices" ],
            changeMethods: [ "attack", "init", "commit", "checkAccess", "trainSoldiers", "buyWorkers", "upgradeBuilding" ],
            sender: window.walletAccount.getAccountId()
        });

        return window.contract;
    }

    login() {
        window.walletAccount.requestSignIn(nearConfig.contractName, 'NEAR Studio Counter');
    }

    logout() {
        window.walletAccount.signOut();
    }

    getUserId(): Observable<string> {
        return new Observable(subscriber => {
            this.connect().then(contract => {
                subscriber.next(contract.account.accountId);
                subscriber.complete();
            })
        })
    }

    getIsLoggedIn(): Observable<boolean> {
        return new Observable(subscriber => {
            this.connect().then(contract => {
                subscriber.next(window.walletAccount && !!window.walletAccount.getAccountId());
                subscriber.complete();
            })
        })
    }

    getSettlementData(id): Observable<Settlement> {
        return new Observable(subscriber => {
            this.connect().then(contract => {
                const settlement = contract.getSettlement({ settlementName: id });
                const buildingsUpgrade = contract.getAllUpgradePrices({ settlementName: id });
                const resources = contract.getResources({ settlementName: id });
                const canBuyWorker = contract.canBuyWorker({ settlementName: id });

                Promise.all([ settlement, buildingsUpgrade, resources, canBuyWorker ])
                    .then(([ settlement, buildingsUpgrade, resources, canBuyWorker ]) => {
                        subscriber.next(Settlement.fromRequest({
                            ...settlement,
                            upgrades: buildingsUpgrade,
                            resources: resources,
                            canBuyWorker: canBuyWorker
                        }));
                        subscriber.complete();
                    });
            })
        })

    }

    getAllPlayerSettlements(): Observable<Array<string>> {

        return new Observable(subscriber => {

            this.connect().then(contract => {
                contract.getAllPlayerSettelments({ owner: contract.account.accountId })
                    .then(response => {
                        subscriber.next(response.ar);
                        subscriber.complete();
                    })

            })
        })


    }

    getAllSettlements(): Observable<Array<string>> {
        return new Observable(subscriber => {
            this.connect().then(contract => {
                contract.getAllSettelments()
                    .then(response => {
                        subscriber.next(response);
                        subscriber.complete();
                    })
            })
        })
    }

    upgradeSettlementBuilding(index, name): Observable<void> {
        return new Observable(subscriber => {
            this.connect().then(contract => {
                contract.upgradeBuilding({ settlementName: name, buildingIndex: index })
                    .then(response => {
                        subscriber.next();
                        subscriber.complete();
                    })

            })
        })
    }

    createSettlement(name): Observable<void> {

        return new Observable(subscriber => {
            this.connect().then(contract => {
                contract.init({ settlementName: name })
                    .then(response => {
                        if (!response.name) throw 'Error creating';
                        subscriber.next();
                        subscriber.complete();
                    })

            })
        })
    }

    trainSoldiers(name): Observable<void> {
        return new Observable(subscriber => {
            this.connect().then(contract => {
                contract.trainSoldiers({ settlementName: name, count: String(1) })
                    .then(response => {
                        subscriber.next();
                        subscriber.complete();
                    })

            })
        })
    }

    trainWorkers(name): Observable<void> {
        return new Observable(subscriber => {
            this.connect().then(contract => {
                contract.buyWorkers({ settlementName: name, n: String(1) })
                    .then(response => {
                        subscriber.next();
                        subscriber.complete();
                    })

            })
        })
    }

    attack(ownName, attackName): Observable<Report> {
        return new Observable(subscriber => {
            this.connect().then(contract => {
                contract.attack({ settlementName: ownName, attackedSettlementName: attackName })
                    .then(response => {
                        subscriber.next(Report.fromRequest(response));
                        subscriber.complete();
                    })

            })
        })
    }
}
