import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from "./game.component";
import { SettlementComponent } from "./settlement/settlement.component";
import { SettlementsComponent } from "./settlements/settlements.component";
import { SettlmenetResolver } from "./settlement/settlmenet.resolver";
import { SettlementsResolver } from "./settlements/settlmenets.resolver";


const routes: Routes = [
  {
    path: '',
    component: GameComponent,
    children: [
      {
        path: 'settlement',
        component: SettlementsComponent,
        resolve: {
          settlements: SettlementsResolver
        }
      },
      {
        path: 'settlement/:id',
        component: SettlementComponent,
        resolve: {
          settlement: SettlmenetResolver
        }
      },
      {
        path: '',
        redirectTo: 'settlement'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
