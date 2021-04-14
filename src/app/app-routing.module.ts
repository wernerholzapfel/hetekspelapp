import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'prediction',
    loadChildren: './pages/predictions_tab/predictions_tab.module#PredictionsTabModule',
  },
  {
    path: 'spelregels',
    loadChildren: () => import('./pages/spelregels/spelregels.module').then(m => m.SpelregelsPageModule)
  },
  {
    path: 'halloffame',
    loadChildren: () => import('./pages/halloffame/halloffame.module').then(m => m.HalloffamePageModule)
  },
  {
    path: 'results',
    loadChildren: () => import('./pages/results/results.module').then( m => m.ResultsPageModule)
  },
  {
    path: 'stand',
    loadChildren: () => import('./pages/stand/stand.module').then(m => m.StandPageModule)
  },
  {
    path: 'deelnemer',
    loadChildren: () => import('./pages/deelnemer/deelnemer.module').then(m => m.DeelnemerPageModule)
  },
  {
    path: 'stats',
    loadChildren: () => import('./pages/stats/stats.module').then(m => m.StatsPageModule)
  },
  {
    path: 'match/:id',
    loadChildren: () => import('./pages/match/match.module').then(m => m.MatchPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
