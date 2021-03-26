import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CityCardHeaderComponent} from '../city-card-header/city-card-header.component';
import {IonicModule} from '@ionic/angular';
import {StandCardComponent} from '../stand-card/stand-card.component';
import {LeagueTableRowComponent} from '../league-table-row/league-table-row.component';
import {FilterKnockoutRoundsPipe} from '../../pipes/filter-knockout-rounds.pipe';
import {MatchCardComponent} from '../match-card/match-card.component';


@NgModule({
    declarations: [CityCardHeaderComponent,
        StandCardComponent,
        LeagueTableRowComponent,
        FilterKnockoutRoundsPipe,
        MatchCardComponent
    ],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [CityCardHeaderComponent,
        StandCardComponent,
        LeagueTableRowComponent,
        MatchCardComponent,
        FilterKnockoutRoundsPipe]
})
export class CustomComponentsModule {
}
