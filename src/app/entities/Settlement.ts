import { Resource } from "./Resource";
import { Building } from "./Building";

export class Settlement {
    name: string;
    resources: Array<Resource> = [];
    buildings: Array<Building> = [];
    canBuyWorker: boolean;
    owner: string;


    constructor(data?) {
        data && Object.assign(this, data);
    }


    public static fromRequest(data: any): Settlement {
        const transformedData = {
            name: data.name,
            owner: data.owner,
            resources: Object.keys(data.resources).map((resource) => {
                return new Resource({
                    type: resource.toUpperCase(),
                    amount: Number(data.resources[resource])
                })
            }),
            buildings: data.buildings.map((building) => {
                return new Building({
                    type: building.buildingType.toUpperCase(),
                    level: building.level,
                    canUpgrade: (data.upgrades[building.buildingType] && data.upgrades[building.buildingType].canUpdate) || false,
                    price: data.upgrades[building.buildingType] && data.upgrades[building.buildingType].price,
                })
            }),
        };
        return new Settlement(transformedData);
    }
}