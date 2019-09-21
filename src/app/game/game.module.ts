import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { HeaderComponent } from './header/header.component';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule } from "@angular/material/button";


@NgModule({
    declarations: [ GameComponent, HeaderComponent ],
    imports: [
        CommonModule,
        GameRoutingModule,
        MatSidenavModule,
        MatIconModule,
        FlexLayoutModule,
        MatButtonModule
    ]
})
export class GameModule {
}
