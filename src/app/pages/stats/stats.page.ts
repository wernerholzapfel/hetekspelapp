import {Component, OnDestroy, OnInit} from '@angular/core';
import {UiService} from '../../services/ui.service';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs';

@Component({
    selector: 'app-deelnemer',
    templateUrl: './stats.page.html',
    styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit, OnDestroy {

    unsubscribe = new Subject<void>();

    constructor(private uiService: UiService,
                private route: ActivatedRoute) {
    }


    ngOnInit() {
        // this.uiService.totaalstand$
        //     .pipe(takeUntil(this.unsubscribe))
        //     .subscribe(s => {
        //     this.standLine = s.find(line => line.id === this.route.snapshot.params.id);
        // });
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.unsubscribe();
    }
}
