import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PoulePageRoutingModule } from './poule-routing.module';

import { PoulePage } from './poule.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PoulePageRoutingModule
  ],
  declarations: [PoulePage]
})
export class PoulePageModule {}
