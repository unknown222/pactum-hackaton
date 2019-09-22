import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Settlement } from "../../entities/Settlement";
import { GameService } from "../game.service";
import { ActivatedRoute, Router } from "@angular/router";
import { finalize, switchMap } from "rxjs/operators";
import { MatSidenav } from "@angular/material/sidenav";
import { GameApiService } from "../../core/api/game-api.service";
import { forkJoin } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { CombatResultsComponent } from "../combat-results/combat-results.component";

@Component({
    selector: 'cm-settlement',
    templateUrl: './settlement.component.html',
    styleUrls: [ './settlement.component.scss' ]
})
export class SettlementComponent implements OnInit, OnDestroy, AfterViewInit {

    settlementId: string;
    public settlement: Settlement;
    neighbors: Array<any> = [];

    isAttacking = false;

    soldiersIsTraining;
    workersHiring;
    isUpgrading;
    userId: string;
    isOwner: boolean;

    @ViewChild('sidenav', { static: false })
    sidenav: MatSidenav;

    constructor(private game: GameService,
                private api: GameApiService,
                private dialog: MatDialog,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.api.getUserId().subscribe(id => {
            this.userId = id;
        });

        this.route.data
            .subscribe(({ settlement }) => {
                this.api.getUserId().subscribe(id => {
                    this.userId = id;
                    this.isOwner = id === settlement.owner;
                });
                this.updateSettlementData(settlement);
            });


        setTimeout(_ => {
            this.game.startDataPoling(this.settlementId)
                .subscribe(settlement => this.updateSettlementData(settlement));
        }, this.game.pollingInterval)

    }

    onUpgradeClick(index) {
        this.isUpgrading = { index };
        this.game.upgradeBuilding(index, this.settlementId)
            .pipe(switchMap(() => {
                    return this.game.getSettlementData(this.settlementId)
                }),
                finalize(() => {
                    this.isUpgrading = false;
                }))
            .subscribe(settlement => this.updateSettlementData(settlement));
    }

    onTrainSoldiers() {
        this.soldiersIsTraining = true;
        this.game.trainSoldiers(this.settlementId)
            .pipe(switchMap(() => {
                    return this.game.getSettlementData(this.settlementId)
                }),
                finalize(() => {
                    this.soldiersIsTraining = false;
                }))
            .subscribe(settlement => this.updateSettlementData(settlement));
    }

    onTrainWorkers() {
        this.workersHiring = true;
        this.game.trainWorkers(this.settlementId)
            .pipe(switchMap(() => {
                    return this.game.getSettlementData(this.settlementId)
                }),
                finalize(() => {
                    this.workersHiring = false;
                }))
            .subscribe(settlement => this.updateSettlementData(settlement));
    }

    updateSettlementData(settlement) {
        this.settlement = settlement;
        this.settlementId = settlement.name;
    }

    ngOnDestroy(): void {
        this.game.stopDataPoling();
    }

    ngAfterViewInit(): void {
        this.sidenav.openedStart.subscribe(opened => {

            forkJoin(this.game.getAllSettlements(), this.game.getOwnSettlements()).subscribe(([ all, own ]) => {
                this.neighbors = all.map(settlement => {
                    return {
                        settlement,
                        own: own.includes(settlement)
                    }
                });
            });
        })
    }

    attack(name) {
        this.isAttacking = true;
        this.game.attack(this.settlement.name, name)
            .pipe( finalize(() => {
                this.isAttacking = false;
            }))
            .subscribe(report => {
            this.dialog.open(CombatResultsComponent, {
                data: report
            });
            return this.game.getSettlementData(this.settlementId)
                .subscribe(settlement => this.updateSettlementData(settlement));
        });
    }

    goTo(neighbor) {
        this.router.navigate([ '../', neighbor ], {
            relativeTo: this.route
        });
        this.sidenav.close();
    }

}
