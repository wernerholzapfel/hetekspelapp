import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {MatchesPage} from './matches.page';
import {LeagueTableRowComponent} from '../../../components/league-table-row/league-table-row.component';
import {MatchCardComponent} from '../../../components/match-card/match-card.component';
import {MenuToolbarModule} from '../../../components/menu-toolbar/menu-toolbar.module';
import {CityCardHeaderComponent} from '../../../components/city-card-header/city-card-header.component';
import {CustomComponentsModule} from '../../../components/custom-components/custom-components.module';

const routes: Routes = [
    {
        path: '',
        component: MatchesPage,
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        MenuToolbarModule,
        CustomComponentsModule,
    ],
    exports: [
        LeagueTableRowComponent
    ],
    declarations: [MatchesPage, LeagueTableRowComponent, MatchCardComponent]
})
export class MatchesPageModule {
}
