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
import {RoundTextPipe} from '../../pipes/roundText.pipe';
import {ScrollVanishDirective} from '../../directives/scroll-vanish.directive';
import {KnockoutTeamHeaderComponent} from '../knockout-team-header/knockout-team-header.component';


@NgModule({
    declarations: [CityCardHeaderComponent,
        StandCardComponent,
        LeagueTableRowComponent,
        FilterKnockoutRoundsPipe,
        FromNowPipe,
        RoundTextPipe,
        MatchCardComponent,
        PuntenChipComponent,
        ParticipantCardComponent,
        HeadlineComponent,
        EditHeadlineComponent,
        ScrollVanishDirective,
        KnockoutTeamHeaderComponent,
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
        FromNowPipe,
        RoundTextPipe,
        ScrollVanishDirective,
        KnockoutTeamHeaderComponent
    ]
})
export class CustomComponentsModule {
}
