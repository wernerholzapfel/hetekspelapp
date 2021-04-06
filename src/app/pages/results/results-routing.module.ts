import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResultsPage } from './results.page';
import {CanDeactivateGuard} from '../../guards/candeactivate.guard';

const routes: Routes = [
  {
    path: 'results',
    canDeactivate: [CanDeactivateGuard],
    component: ResultsPage,
    children: [
      {
        path: 'matches',
        loadChildren: '../results/matches/matches.module#MatchesPageModule',
      },
      {
        path: 'knockout',
        loadChildren: '../results/knockout/knockout.module#KnockoutPageModule',
      },
      {
        path: 'poule',
        loadChildren: '../results/poule/poule.module#PoulePageModule'
      }, {
        path: 'stand',
        loadChildren: '../results/stand/stand.module#StandPageModule'
      }]
  }, {
    path: '',
    redirectTo: 'results/matches',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResultsPageRoutingModule {}
