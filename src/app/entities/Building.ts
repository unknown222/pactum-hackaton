export class Building {
    type: BuildingType;
    level: number;
    canUpgrade: boolean;
    price: number;

    constructor(data) {
        Object.assign(this, data);
    }
}

export enum BuildingType {
    FARM = 'FARM',
    LUMBER = 'LUMBER',
    MINE = 'MINE',
    CASTLE = 'CASTLE',
    BARRACKS = 'BARRACKS',
    WALL = 'WALL'
}
