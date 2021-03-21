import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {PredictionsTabPage} from './predictions_tab.page';
import {MenuToolbarModule} from '../../components/menu-toolbar/menu-toolbar.module';
import {CanDeactivateGuard} from '../../guards/candeactivate.guard';

const routes: Routes = [
    {
        path: 'prediction',
        canDeactivate: [CanDeactivateGuard],
        component: PredictionsTabPage,
        children: [
            {
                path: 'matches',
                loadChildren: '../predictions_tab/matches/matches.module#MatchesPageModule',
            },
            {
                path: 'knockout',
                loadChildren: '../predictions_tab/knockout/knockout.module#KnockoutPageModule',
            },
            {
                path: 'poule',
                loadChildren: '../predictions_tab/poule/poule.module#PoulePageModule'
            }]
    }, {
        path: '',
        redirectTo: 'prediction/matches',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        MenuToolbarModule
    ],
    declarations: [PredictionsTabPage]
})
export class PredictionsTabModule {
}
