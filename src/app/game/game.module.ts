import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { HeaderComponent } from './header/header.component';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule } from "@angular/material/button";
import { GameService } from "./game.service";
import { MapComponent } from './map/map.component';
import { BuildingsComponent } from './buildings/buildings.component';
import { IconsPipe } from "./icons.pipe";
import { NamesPipe } from "./names.pipe";
import { SettlementsComponent } from './settlements/settlements.component';
import { SettlementComponent } from './settlement/settlement.component';
import { SettlmenetResolver } from "./settlement/settlmenet.resolver";
import { SettlementsResolver } from "./settlements/settlmenets.resolver";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { CombatResultsComponent } from './combat-results/combat-results.component';
import { MatDialogModule } from "@angular/material/dialog";
import { BuildingComponent } from './building/building.component';


@NgModule({
    declarations: [ GameComponent, HeaderComponent, MapComponent, BuildingsComponent, IconsPipe, NamesPipe, SettlementsComponent, SettlementComponent, CombatResultsComponent, BuildingComponent ],
    imports: [
        CommonModule,
        GameRoutingModule,
        MatSidenavModule,
        MatIconModule,
        FlexLayoutModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatProgressBarModule,
        MatDialogModule
    ],
    providers: [ GameService, SettlmenetResolver, SettlementsResolver ],
    entryComponents: [CombatResultsComponent]
})
export class GameModule {
}
