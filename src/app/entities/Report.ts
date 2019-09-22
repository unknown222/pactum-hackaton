import { Resource } from "./Resource";

export class Report {
    lost: number;
    beat: number;
    resources: Array<Resource>;

    constructor(data?) {
        Object.assign(this, data);
    }

    static fromRequest(data) {
        const transformedData = {
            lost: data.lost,
            beat: data.beat,
            resources: Object.keys(data.resources).map((resource) => {
                return new Resource({
                    type: resource.toUpperCase(),
                    amount: Number(data.resources[resource])
                })
            })
        };
        return new Report(transformedData);
    }
}