import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CityCardHeaderComponent} from '../city-card-header/city-card-header.component';
import {IonicModule} from '@ionic/angular';
import {StandCardComponent} from '../stand-card/stand-card.component';
import {LeagueTableRowComponent} from '../league-table-row/league-table-row.component';
import {FilterKnockoutRoundsPipe} from '../../pipes/filter-knockout-rounds.pipe';
import {MatchCardComponent} from '../match-card/match-card.component';
import {PuntenChipComponent} from '../punten-chip/punten-chip.component';
import {ParticipantCardComponent} from '../participant-card/participant-card.component';
import {FromNowPipe} from '../../pipes/fromNow.pipe';
import {HeadlineComponent} from '../headline/headline.component';
import {EditHeadlineComponent} from '../edit-headline/edit-headline.component';
import {FormsModule} from '@angular/forms';


@NgModule({
    declarations: [CityCardHeaderComponent,
        StandCardComponent,
        LeagueTableRowComponent,
        FilterKnockoutRoundsPipe,
        FromNowPipe,
        MatchCardComponent,
        PuntenChipComponent,
        ParticipantCardComponent,
        HeadlineComponent,
        EditHeadlineComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule
    ],
    exports: [CityCardHeaderComponent,
        StandCardComponent,
        LeagueTableRowComponent,
        MatchCardComponent,
        PuntenChipComponent,
        ParticipantCardComponent,
        HeadlineComponent,
        EditHeadlineComponent,
        FilterKnockoutRoundsPipe,
        FromNowPipe
    ]
})
export class CustomComponentsModule {
}
