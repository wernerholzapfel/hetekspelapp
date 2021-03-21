import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CityCardHeaderComponent} from '../city-card-header/city-card-header.component';
import {IonicModule} from '@ionic/angular';
import {StandCardComponent} from '../stand-card/stand-card.component';
import {LeagueTableRowComponent} from '../league-table-row/league-table-row.component';


@NgModule({
    declarations: [CityCardHeaderComponent,
        StandCardComponent,
        LeagueTableRowComponent],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [CityCardHeaderComponent,
        StandCardComponent,
        LeagueTableRowComponent]
})
export class CustomComponentsModule {
}
