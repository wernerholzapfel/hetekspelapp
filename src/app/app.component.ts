import {Component, OnDestroy, OnInit} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {MenuItem, MenuService} from './services/menu.service';
import {Subject} from 'rxjs';
import {NavigationEnd, Router, RouterEvent} from '@angular/router';
import {take, takeUntil} from 'rxjs/operators';
import {AuthService} from './services/auth.service';
import {UiService} from './services/ui.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {CodePush, InstallMode} from '@ionic-native/code-push/ngx';
import {environment} from '../environments/environment';
import {LoaderService} from './services/loader.service';
import {FCM} from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import {ParticipantService} from './services/participant.service';

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
        private authService: AuthService,
        private uiService: UiService,
        private codePush: CodePush,
        private loaderService: LoaderService,
        private participantService: ParticipantService
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            if (this.platform.is('cordova')) {
                this.checkCodePush();
                this.requestPushPermission();

                this.fcm.onNotification().subscribe(data => {
                    if (data.wasTapped) {
                        console.log('Received in background');
                    } else {
                        console.log('Received in foreground');
                    }
                });

                this.fcm.onTokenRefresh().subscribe(token => {
                    this.participantService.putPushToken({pushtoken: token}).subscribe(response => {
                        console.log(response);
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
                    return Object.assign(p, {active: (event.url.toLowerCase().startsWith(p.url.toLowerCase()))});
                });
            }
        });

        this.platform.resume.subscribe(() => {
            if (this.platform.is('cordova')) {
                this.checkCodePush();
                this.getToken();
            }
        });
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
            console.log('werner de permission is: ' + hasPermission);
        });
    }

    getToken() {
        this.fcm.getToken().then(token => {
            this.participantService.putPushToken({pushtoken: token}).subscribe(response => {
                console.log('token opgeslagen');
            });
            console.log('werner: token aangeroepen');
        });
    }

    unsubscribeFromTopic() {
        this.fcm.unsubscribeFromTopic('enappd');
    }


    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.unsubscribe();
    }
}
