import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {AngularFireDatabase} from '@angular/fire/database';
import {Router} from '@angular/router';

@Component({
    selector: 'app-knockout',
    templateUrl: './toto.page.html',
    styleUrls: ['./toto.page.scss'],
})
export class TotoPage implements OnInit, OnDestroy {

    totoStats: any[];
    unsubscribe = new Subject<void>();

    constructor(private db: AngularFireDatabase,
                private router: Router) {
    }

    ngOnInit() {
        this.db.list<any>(`stats/toto`)
            .valueChanges()
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(totoStats => {
                console.log(totoStats)
                this.totoStats = totoStats;
            });
    }

    openMatch(matchId: string) {
        this.router.navigate([`match/${matchId}`]);
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.unsubscribe();
    }
}