import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export interface MenuItem {
    title: string;
    url: string;
    icon: string;
    active: boolean;
    onlyForAdmin: boolean;
    onlyForUser: boolean;
    showAfterRegistration?: boolean;
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
            icon: 'home',
            active: true,
            onlyForAdmin: false,
            onlyForUser: false,
            showAfterRegistration: false
        },
        {
            title: 'Voorspellen',
            url: '/prediction',
            icon: 'football-outline',
            active: false,
            onlyForAdmin: false,
            onlyForUser: true,
            showAfterRegistration: false

        },{
            title: 'Resultaten',
            url: '/results',
            icon: 'create-outline',
            active: false,
            onlyForAdmin: true,
            onlyForUser: false,
            showAfterRegistration: false

        }, {
            title: 'Spelregels',
            url: '/spelregels',
            icon: 'bulb-outline',
            active: false,
            onlyForAdmin: false,
            onlyForUser: false,
            showAfterRegistration: false

        }, {
            title: 'Hall of Fame',
            url: '/halloffame',
            icon: 'ribbon-outline',
            active: false,
            onlyForAdmin: false,
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
                    : item.onlyForUser
                        ? user
                        : item.showAfterRegistration
                            ? admin || !registrationOpen
                            : true
            };
        }));
    }
}
