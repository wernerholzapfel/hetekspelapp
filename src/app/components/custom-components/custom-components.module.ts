import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CityCardHeaderComponent} from '../city-card-header/city-card-header.component';
import {IonicModule} from '@ionic/angular';
import {StandCardComponent} from '../stand-card/stand-card.component';


@NgModule({
    declarations: [CityCardHeaderComponent,
        StandCardComponent],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [CityCardHeaderComponent,
        StandCardComponent]
})
export class CustomComponentsModule {
}
