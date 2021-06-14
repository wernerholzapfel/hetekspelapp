import {Component} from '@angular/core';
import {IStandLine} from '../../models/stand.model';
import {UiService} from '../../services/ui.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-deelnemer',
    templateUrl: './deelnemer.page.html',
    styleUrls: ['./deelnemer.page.scss'],
})
export class DeelnemerPage {

    standLine: IStandLine;
    unsubscribe: Subject<void>;

    constructor(private uiService: UiService,
                private route: ActivatedRoute,
                private router: Router) {
    }


    ionViewDidEnter() {
        this.unsubscribe = new Subject<void>();

        if (this.route.snapshot.params.id) {
            this.uiService.totaalstand$
                .pipe(takeUntil(this.unsubscribe))
                .subscribe(s => {
                    if (s.length > 0) {
                        this.standLine = s.find(line => line.id === this.route.snapshot.params.id);
                    }
                });
        } else {
            this.uiService.participant$.pipe(takeUntil(this.unsubscribe)).subscribe(participant => {
                if (participant) {
                    this.router.navigate([`deelnemer/deelnemer/${participant.id}/matches`], {replaceUrl: true});
                }
            });
        }

    }

    ionViewDidLeave(): void {
        this.unsubscribe.next();
        this.unsubscribe.unsubscribe();
    }
}
