import { Pipe, PipeTransform } from '@angular/core';
import { ResourceType } from "../entities/Resource";
import { BuildingType } from "../entities/Building";

@Pipe({
    name: 'typesToNames'
})
export class NamesPipe implements PipeTransform {

    convertMap;

    constructor() {
        this.convertMap = {
            [ResourceType.FOOD]: 'Food',
            [ResourceType.WOOD]: 'Wood',
            [ResourceType.ORE]: 'Ore',
            [ResourceType.SOLDIERS]: 'Soldiers',
            [ResourceType.WORKERS]: 'Workers',
            [BuildingType.BARRACKS]: 'Barracks',
            [BuildingType.CASTLE]: 'Castle',
            [BuildingType.WALL]: 'Wall',
            [BuildingType.FARM]: 'Farm',
            [BuildingType.LUMBER]: 'Lumber',
            [BuildingType.MINE]: 'Mine',
        }
    }

    transform(value: any, options?: any): any {
        return this.convertMap[value] || value;
    }

}
