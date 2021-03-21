import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {PoulePageRoutingModule} from './poule-routing.module';

import {PoulePage} from './poule.page';
import {MatchesPageModule} from '../matches/matches.module';
import {MenuToolbarModule} from '../../../components/menu-toolbar/menu-toolbar.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PoulePageRoutingModule,
        MatchesPageModule,
        MenuToolbarModule
    ],
  declarations: [PoulePage]
})
export class PoulePageModule {}
