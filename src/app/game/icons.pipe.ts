import { Pipe, PipeTransform } from '@angular/core';
import { BuildingType } from "../entities/Building";
import { ResourceType } from "../entities/Resource";

@Pipe({
    name: 'typesToIcons'
})
export class IconsPipe implements PipeTransform {

    convertMap;

    constructor() {
        this.convertMap = {
            [BuildingType.WALL]: 'assets/icons/Wall.png',
            [BuildingType.LUMBER]: 'assets/icons/Lumbermill.png',
            [BuildingType.MINE]: 'assets/icons/Mines.png',
            [BuildingType.FARM]: 'assets/icons/Mill.png',
            [BuildingType.CASTLE]: 'assets/icons/Castle.png',
            [BuildingType.BARRACKS]: 'assets/icons/Soldier.png',
            [ResourceType.WORKERS]: 'assets/resources/Human.png',
            [ResourceType.ORE]: 'assets/resources/Ore.png',
            [ResourceType.FOOD]: 'assets/resources/Food.png',
            [ResourceType.SOLDIERS]: 'assets/resources/Military.png',
            [ResourceType.WOOD]: 'assets/resources/Lumber.png',
        }
    }

    transform(value: any, options?: any): any {
        return this.convertMap[value] || value;
    }

}
