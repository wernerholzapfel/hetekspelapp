import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {MenuItem, MenuService} from './services/menu.service';
import {Subject, timer} from 'rxjs';
import {NavigationEnd, Router, RouterEvent} from '@angular/router';
import {switchMap, take, takeUntil} from 'rxjs/operators';
import {AuthService} from './services/auth.service';
import {UiService} from './services/ui.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {CodePush, InstallMode} from '@ionic-native/code-push/ngx';
import {environment} from '../environments/environment';
import {LoaderService} from './services/loader.service';
import {FCM} from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import {ParticipantService} from './services/participant.service';
import * as moment from 'moment';
import {HetekspelService} from './services/hetekspel.service';
import {RouteStateService} from './services/route-state.service';

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
        private fcm: FCM,
        private router: Router,
        private db: AngularFireDatabase,
        private menuService: MenuService,
        public authService: AuthService,
        public uiService: UiService,
        private codePush: CodePush,
        private loaderService: LoaderService,
        private hetEKSpelService: HetekspelService,
        private participantService: ParticipantService,
        private routeStateService: RouteStateService,
        private ngZone: NgZone
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.checkDeadline();
        this.checkDarkmode();
        this.platform.ready().then(() => {

            this.statusBar.styleDefault();
            this.splashScreen.hide();

            if (this.platform.is('cordova')) {
                this.checkCodePush();
                this.requestPushPermission();

                this.fcm.onNotification().subscribe(data => {
                    if (data.wasTapped) {
                    } else {
                    }
                });

                this.fcm.onTokenRefresh().subscribe(token => {
                    this.participantService.putPushToken({pushtoken: token}).subscribe(response => {
                    });
                });
            }
        });
    }

    ngOnInit() {

        this.menuService.appPages$.pipe(takeUntil(this.unsubscribe)).subscribe(menu => {
            if (menu) {
                this.appPages = menu;
            }
        });

        this.db.list<any>(`totaal`)
            .valueChanges()
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(totaalstand => {
                this.uiService.totaalstand$.next(totaalstand);
            });

        this.db.object<{ lastUpdated: number }>(`lastUpdated`)
            .valueChanges()
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(item => {
                this.uiService.lastUpdated$.next(item);
            });


        // set linkactive.
        this.router.events.pipe(takeUntil(this.unsubscribe)).subscribe((event: RouterEvent) => {
            if (event instanceof NavigationEnd) {
                this.menuService.appPages$.getValue().map(p => {
                    return Object.assign(p, {
                        active: p.urls.filter(url =>
                            (event.urlAfterRedirects.toLowerCase().startsWith(url.toLowerCase()))).length > 0
                    });
                });
            }
        });

        this.platform.resume.subscribe(() => {
            if (this.platform.is('cordova')) {
                this.checkCodePush();
                this.getToken();
                this.refresh();
            }
        });
    }

    public refresh(): void {
        const currentPage = this.routeStateService.getCurrentRouteComponent();
        if (currentPage && currentPage.refresh) {
            currentPage.refresh(null);
        }
    }

    checkCodePush() {
        const downloadProgress = (progress) => {
            this.loaderService.isLoading.next(progress.receivedBytes !== progress.totalBytes);
        };

        this.codePush.sync({
            updateDialog: {
                appendReleaseDescription: false,
                updateTitle: 'Het EK Spel',
                mandatoryUpdateMessage: 'Er is een nieuwe update beschikbaar',
                mandatoryContinueButtonLabel: 'Installeer update'
            },
            deploymentKey: this.platform.is('ios') ? environment.codePush.iOSCodePush : environment.codePush.androidCodePush,
            installMode: InstallMode.IMMEDIATE
        }, downloadProgress).pipe(take(1)).subscribe(
            (syncStatus) => {
            },
            (error) => {
                console.error('CODE PUSH ERROR: ' + error);
            });
    }

    subscribeToTopic() {
        this.fcm.subscribeToTopic('enappd');
    }

    requestPushPermission() {
        this.fcm.requestPushPermission({}).then(hasPermission => {
        });
    }

    getToken() {
        this.fcm.getToken().then(token => {
            this.participantService.putPushToken({pushtoken: token}).subscribe(response => {
            });
        });
    }

    unsubscribeFromTopic() {
        this.fcm.unsubscribeFromTopic('enappd');
    }

    checkDarkmode() {
        const prefersDarkMQL = window.matchMedia('(prefers-color-scheme: dark)');
        this.uiService.prefersDark$.next(prefersDarkMQL.matches);
        prefersDarkMQL.addListener((e) => {
            this.ngZone.run(() => {
                this.uiService.prefersDark$.next(e.matches);
            });
        });

    }

    checkDeadline() {
        this.hetEKSpelService.getHetEKSpel().pipe(take(1))
            .pipe(switchMap((hetekspel) => {
                const deadline = moment(hetekspel.deadline);
                const now = moment(new Date());
                const diffDays = deadline.diff(now, 'milliseconds');
                this.uiService.isRegistrationOpen$.next(diffDays > 0);

                return timer(diffDays);
            })).pipe(takeUntil(this.unsubscribe)).subscribe(
            (x) => {
            },
            (x) => console.log(x),
            () => {
                this.uiService.isRegistrationOpen$.next(false);
            }
        );
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.unsubscribe();
    }
}
