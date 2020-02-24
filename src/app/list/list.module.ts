import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { ListPage } from './list.page';
import {LeagueTableRowComponent} from '../components/league-table-row/league-table-row.component';
import {MatchCardComponent} from '../components/match-card/match-card.component';
import {StandCardComponent} from '../components/stand-card/stand-card.component';

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
    ])
  ],
  declarations: [ListPage, LeagueTableRowComponent, MatchCardComponent, StandCardComponent]
})
export class ListPageModule {}
