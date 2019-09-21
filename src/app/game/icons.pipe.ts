import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'typesToIcons'
})
export class IconsPipe implements PipeTransform {

    convertMap;

    constructor() {
        this.convertMap = {}
    }

    transform(value: any, options?: any): any {
        return this.convertMap[value] || value;
    }

}
