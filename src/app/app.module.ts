import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AuthService} from './services/auth.service';
import {ParticipantService} from './services/participant.service';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TokenInterceptor} from './interceptor/token.interceptor';
import {LoaderService} from './services/loader.service';
import {LoaderInterceptor} from './interceptor/loader.interceptor';
import {MenuService} from './services/menu.service';
import {FilterKnockoutRoundsPipe} from './pipes/filter-knockout-rounds.pipe';
import {LoaderModule} from './components/loader/loader.module';
import {UiService} from './services/ui.service';
import {CanDeactivateGuard} from './guards/candeactivate.guard';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import localeNl from '@angular/common/locales/nl';
import {registerLocaleData} from '@angular/common';
import {CodePush} from '@ionic-native/code-push/ngx';
registerLocaleData(localeNl);


@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase, 'angular-auth-firebase'),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        LoaderModule,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoaderInterceptor,
            multi: true,
        },
        { provide: LOCALE_ID, useValue: 'nl-NL' },
        AuthService,
        CodePush,
        ParticipantService,
        LoaderService,
        MenuService,
        UiService,
        CanDeactivateGuard,
        FilterKnockoutRoundsPipe
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
