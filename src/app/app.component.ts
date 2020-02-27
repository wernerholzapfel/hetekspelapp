import {Component, OnDestroy, OnInit} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {MenuItem, MenuService} from './services/menu.service';
import {Subject} from 'rxjs';
import {NavigationEnd, Router, RouterEvent} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {AuthService} from './services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

    public appPages: MenuItem[];
    unsubscribe = new Subject<void>();

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private router: Router,
        private menuService: MenuService,
        private authService: AuthService
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    ngOnInit() {
        this.menuService.appPages$.pipe(takeUntil(this.unsubscribe)).subscribe(menu => {
            if (menu) {
                this.appPages = menu;
            }
        });

        // set linkactive.
        this.router.events.pipe(takeUntil(this.unsubscribe)).subscribe((event: RouterEvent) => {
            if (event instanceof NavigationEnd) {
                this.menuService.appPages$.getValue().map(p => {
                    return Object.assign(p, {active: (event.url.startsWith(p.url))});
                });
            }
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.unsubscribe();
    }
}
