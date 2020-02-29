import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import {LoginModule} from '../../components/login/login.module';
import {MenuToolbarModule} from '../../components/menu-toolbar/menu-toolbar.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: HomePage
            }
        ]),
        LoginModule,
        MenuToolbarModule
    ],
  declarations: [HomePage]
})
export class HomePageModule {}
