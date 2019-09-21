import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Settlement } from "../../entities/Settlement";
import { ResourceType } from "../../entities/Resource";

@Component({
    selector: 'cm-map',
    templateUrl: './map.component.html',
    styleUrls: [ './map.component.scss' ]
})
export class MapComponent implements OnInit {

    @Input()
    settlement: Settlement;

    @Input()
    soldiersIsTraining;

    @Input()
    workersHiring;

    @Input()
    isOwner: boolean;

    @Output()
    trainSoldiers = new EventEmitter();

    @Output()
    trainWorkers = new EventEmitter();

    canTrainSoldiers() {
        const requirements = [
            {
                type: ResourceType.FOOD,
                amount: 3000
            },
            {
                type: ResourceType.ORE,
                amount: 1
            },
            {
                type: ResourceType.WORKERS,
                amount: 1
            }
        ];
        return !this.settlement.resources.some(resource => {
            return requirements.some(requirement => {
              return requirement.type === resource.type && requirement.amount > resource.amount;
            })
        });
    }

    constructor() {
    }

    ngOnInit() {
    }

}
