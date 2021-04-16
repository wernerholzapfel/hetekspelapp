import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {AngularFireDatabase} from '@angular/fire/database';
import {Router} from '@angular/router';

@Component({
    selector: 'app-poule',
    templateUrl: './knockout.page.html',
    styleUrls: ['./knockout.page.scss'],
})
export class KnockoutPage implements OnInit, OnDestroy {
    knockoutStats: any[];
    unsubscribe = new Subject<void>();

    constructor(private db: AngularFireDatabase,
                private router: Router) {
    }

    ngOnInit() {
        this.db.list<any>(`stats/knockout`)
            .valueChanges()
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(knockoutStats => {
                this.knockoutStats = knockoutStats;
            });
    }

    openKoTeam(team, round) {
        this.router.navigate([`stats/knockout/round/${round}/team/${team}`]);
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.unsubscribe();
    }

}
