import { Component, Input, OnInit } from '@angular/core';
import { Building, BuildingType } from "../../entities/Building";

@Component({
  selector: 'cm-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.scss']
})
export class BuildingComponent implements OnInit {


  @Input()
  set building(building: Building) {
    this.getBuildingConfig(building)
  }

  buildingConfig: any;

  constructor() { }

  ngOnInit() {

  }

  getBuildingConfig(building: Building) {
    this.buildingConfig = buildingsConfig[building.type] && buildingsConfig[building.type].slice(0, building.level);
  }

}


const buildingsConfig = {
  [BuildingType.LUMBER]: [
    {
      src: 'assets/buildings/mill-tier-1.png',
      top: '5%',
      left: '15%',
      width: '100px',
      height: 'auto'
    },
    {
      src: 'assets/buildings/mill-tier-2.png',
      top: '8%',
      left: '18%',
      width: '30px',
      height: 'auto'
    },
    {
      src: 'assets/buildings/mill-tier-3.png',
      top: '18%',
      left: '16%',
      width: '40px',
      height: 'auto'
    },
  ],
  [BuildingType.MINE]: [
    {
      src: 'assets/buildings/mine.png',
      top: '18%',
      left: '89.3%',
      width: '30px',
      height: 'auto'
    },
    {
      src: 'assets/buildings/mine.png',
      top: '17%',
      left: '84%',
      width: '40px',
      height: 'auto'
    },
    {
      src: 'assets/buildings/mine.png',
      top: '16%',
      left: '94.5%',
      width: '30px',
      height: 'auto'
    },
  ],
  [BuildingType.FARM]: [
    {
      src: 'assets/buildings/farm-tier-1.png',
      top: '14%',
      left: '24%',
      width: '100px',
      height: 'auto'
    },
    {
      src: 'assets/buildings/farm-tier-2.png',
      top: '20%',
      left: '30%',
      width: '100px',
      height: 'auto'
    },
    {
      src: 'assets/buildings/farm-tier-3.png',
      top: '35%',
      left: '25%',
      width: '100px',
      height: 'auto'
    },
  ],
  [BuildingType.WALL]: [
    {
      src: 'assets/buildings/wall.png',
      top: '1%',
      left: '22%',
      width: '58%',
      height: '67%'
    }
  ],

};