import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export interface MenuItem {
    title: string;
    url: string;
    urls: string[];
    icon: string;
    active: boolean;
    onlyForAdmin: boolean;
    onlyForUser: boolean;
    showAfterRegistration?: boolean;
    hideAfterRegistration?: boolean;
    show?: boolean;
}

@Injectable({
    providedIn: 'root'
})

export class MenuService {

    constructor() {
    }

    public appPages$: BehaviorSubject<MenuItem[]> = new BehaviorSubject([
        {
            title: 'Home',
            url: '/home',
            urls: ['/home'],
            icon: 'home',
            active: true,
            onlyForAdmin: false,
            onlyForUser: false,
            showAfterRegistration: false
        },
        {
            title: 'Voorspellen',
            url: '/prediction',
            urls: ['/prediction'],
            icon: 'football-outline',
            active: false,
            onlyForAdmin: false,
            onlyForUser: true,
            showAfterRegistration: false,
            hideAfterRegistration: true

        }, {
            title: 'Voorspelling',
            url: '/deelnemer/deelnemer/',
            urls: ['/prediction'],
            icon: 'football-outline',
            active: false,
            onlyForAdmin: false,
            onlyForUser: true,
            showAfterRegistration: true

        }, {
            title: 'Stand',
            url: '/stand',
            urls: ['/stand', '/deelnemer', '/match'],
            icon: 'podium-outline',
            active: false,
            onlyForAdmin: false,
            onlyForUser: true,
            showAfterRegistration: false

        }, {
            title: 'Statistieken',
            url: '/stats',
            urls: ['/stats'],
            icon: 'stats-chart-outline',
            active: false,
            onlyForAdmin: false,
            onlyForUser: true,
            showAfterRegistration: false

        }, {
            title: 'Spelregels',
            url: '/spelregels',
            urls: ['/spelregels'],
            icon: 'bulb-outline',
            active: false,
            onlyForAdmin: false,
            onlyForUser: false,
            showAfterRegistration: false

        }, {
            title: 'Hall of Fame',
            url: '/halloffame',
            urls: ['/halloffame'],
            icon: 'ribbon-outline',
            active: false,
            onlyForAdmin: false,
            onlyForUser: false,
            showAfterRegistration: false
        }, {
            title: 'Admin',
            url: '/results',
            urls: ['/results'],
            icon: 'create-outline',
            active: false,
            onlyForAdmin: true,
            onlyForUser: false,
            showAfterRegistration: false

        }
    ]);

    setMenu(admin: boolean, user, registrationOpen: boolean) {
        this.appPages$.next(this.appPages$.getValue().map(item => {
            return {
                ...item,
                show: item.onlyForAdmin
                    ? admin
                    : item.hideAfterRegistration
                        ? registrationOpen
                        : item.onlyForUser
                            ? user
                            : item.showAfterRegistration
                                ? admin || !registrationOpen
                                : true
            };
        }));
    }
}
