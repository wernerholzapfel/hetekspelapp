import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
