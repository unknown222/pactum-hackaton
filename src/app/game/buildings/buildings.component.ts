import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Settlement } from "../../entities/Settlement";
import { BuildingType } from "../../entities/Building";

@Component({
    selector: 'cm-buildings',
    templateUrl: './buildings.component.html',
    styleUrls: [ './buildings.component.scss' ]
})
export class BuildingsComponent implements OnInit {

    @Input()
    settlement: Settlement;

    @Input()
    isUpgrading;

    @Input()
    isOwner;

    @Output()
    upgradeClick = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    upgrade(type) {
        this.upgradeClick.emit(this.buildingIndexed[type])
    }

    buildingIndexed = {
        [BuildingType.FARM]: 0,
        [BuildingType.LUMBER]: 1,
        [BuildingType.MINE]: 2,
    };


    isInProgress(data, building) {
        if (!data) return false;
        return building.type === Object.keys(this.buildingIndexed)[data.index];
    }


}
