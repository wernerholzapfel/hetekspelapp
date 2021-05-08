import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {DeadlineGuard} from './guards/deadline.guard';

const routes: Routes = [
    {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
    },
    {
        path: 'prediction',
        loadChildren: './pages/predictions_tab/predictions_tab.module#PredictionsTabModule',
        canActivate: [DeadlineGuard],
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
        loadChildren: () => import('./pages/results/results.module').then(m => m.ResultsPageModule)
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
        path: 'stats/knockout/round/:roundid/team/:teamid',
        loadChildren: () => import('./pages/stats/knockout/participant/knockout-participants/knockout-participants.module').then(m => m.KnockoutParticipantsPageModule)
    },
    {
        path: 'disclaimer',
        loadChildren: () => import('./pages/disclaimer/disclaimer.module').then(m => m.DisclaimerPageModule)
    },
    {
        path: 'match/:id',
        loadChildren: () => import('./pages/match/match.module').then(m => m.MatchPageModule)
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
