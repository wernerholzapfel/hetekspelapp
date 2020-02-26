import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { ListPage } from './list.page';
import {LeagueTableRowComponent} from '../components/league-table-row/league-table-row.component';
import {MatchCardComponent} from '../components/match-card/match-card.component';
import {StandCardComponent} from '../components/stand-card/stand-card.component';
import {MenuToolbarComponent} from '../components/menu-toolbar/menu-toolbar.component';
import {MenuToolbarModule} from '../components/menu-toolbar/menu-toolbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: ListPage
      }
    ]),
    MenuToolbarModule
  ],
  declarations: [ListPage, LeagueTableRowComponent, MatchCardComponent, StandCardComponent]
})
export class ListPageModule {}
