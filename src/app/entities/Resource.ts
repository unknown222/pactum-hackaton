export class Resource {
    type: ResourceType;
    amount: number = 0;

    constructor(data) {
        Object.assign(this, data);
    }

}

export enum ResourceType {
    FOOD = 'FOOD',
    WOOD = 'WOOD',
    ORE = 'ORE',
    WORKERS = 'WORKERS',
    SOLDIERS = 'SOLDIERS'
}