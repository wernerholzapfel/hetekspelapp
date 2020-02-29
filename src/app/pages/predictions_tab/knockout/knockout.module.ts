import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KnockoutPageRoutingModule } from './knockout-routing.module';

import { KnockoutPage } from './knockout.page';
import {MenuToolbarModule} from '../../../components/menu-toolbar/menu-toolbar.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        KnockoutPageRoutingModule,
        MenuToolbarModule
    ],
  declarations: [KnockoutPage]
})
export class KnockoutPageModule {}
