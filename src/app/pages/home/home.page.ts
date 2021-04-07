import {Component, OnDestroy, OnInit} from '@angular/core';
import {UiService} from '../../services/ui.service';
import {takeUntil} from 'rxjs/operators';
import {IStandLine} from '../../models/stand.model';
import {Subject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

    standLine: IStandLine;
    lastUpdated: number;
    unsubscribe = new Subject<void>();

    constructor(private uiService: UiService) {
    }

    ngOnInit() {
        this.uiService.totaalstand$
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(s => {
                this.standLine = s[0];
            });

        this.uiService.lastUpdated$
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(item => {
                this.lastUpdated = item.lastUpdated;
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.unsubscribe();
    }
}
