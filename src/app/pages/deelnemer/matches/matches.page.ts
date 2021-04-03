import {Component, OnDestroy, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {UiService} from '../../../services/ui.service';
import {ActivatedRoute} from '@angular/router';
import {IStandLine} from '../../../models/stand.model';
import {Subject} from 'rxjs';
import {MatchService} from '../../../services/match.service';
import {IMatchPrediction} from '../../../models/participant.model';

@Component({
    selector: 'app-matches',
    templateUrl: './matches.page.html',
    styleUrls: ['./matches.page.scss'],
})
export class MatchesPage implements OnInit, OnDestroy {

    standLine: IStandLine
    unsubscribe = new Subject<void>();
    predictions: IMatchPrediction[];

    constructor(private uiService: UiService,
                private route: ActivatedRoute,
                private matchService: MatchService
    ) {
    }

    ngOnInit() {
        this.uiService.totaalstand$
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(s => {
                this.standLine = s.find(line => line.id === this.route.snapshot.parent.parent.params.id);
            });

        this.matchService.getMatchPredictionsForParticipant(this.route.snapshot.parent.parent.params.id).subscribe(
            matchPredictions => {
                this.predictions = matchPredictions;
            });

    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.unsubscribe();
    }
}
