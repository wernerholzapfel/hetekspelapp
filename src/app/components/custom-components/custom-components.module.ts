import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CityCardHeaderComponent} from '../city-card-header/city-card-header.component';
import {IonicModule} from '@ionic/angular';



@NgModule({
  declarations: [CityCardHeaderComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [CityCardHeaderComponent]
})
export class CustomComponentsModule { }
