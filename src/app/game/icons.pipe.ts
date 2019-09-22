import { Pipe, PipeTransform } from '@angular/core';
import { BuildingType } from "../entities/Building";

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
        }
    }

    transform(value: any, options?: any): any {
        return this.convertMap[value] || value;
    }

}
