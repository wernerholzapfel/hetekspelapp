import {Component, OnDestroy, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {UiService} from '../../../services/ui.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IStandLine} from '../../../models/stand.model';
import {Subject} from 'rxjs';
import {MatchService} from '../../../services/match.service';
import {IMatchPrediction} from '../../../models/participant.model';
import {Gesture} from '../../../directives/gestures.directive';

@Component({
    selector: 'app-matches',
    templateUrl: './matches.page.html',
    styleUrls: ['./matches.page.scss'],
})
export class MatchesPage implements OnInit, OnDestroy {

    standLine: IStandLine;
    unsubscribe = new Subject<void>();
    predictions: IMatchPrediction[];
    gestureOpts: Gesture[] = [
        // {name: 'tap'},
        // {name: 'doubleTap'},
        // {name: 'press'},
        {name: 'swipe'},
    ];
    stand: IStandLine[];
    standIndex: number;

    constructor(private uiService: UiService,
                private route: ActivatedRoute,
                private router: Router,
                private matchService: MatchService
    ) {
    }

    ngOnInit() {
        this.uiService.totaalstand$
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(s => {
                this.stand = s;
                this.standIndex = s.findIndex(line => line.id === this.route.snapshot.parent.parent.params.id);
                this.standLine = s[this.standIndex];
            });

        this.matchService.getMatchPredictionsForParticipant(this.route.snapshot.parent.parent.params.id).subscribe(
            matchPredictions => {
                this.predictions = matchPredictions;
            });

    }

    openMatch(matchId: string) {
        this.router.navigate([`match/${matchId}`]);
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.unsubscribe();
    }

    onTap($event) {
        console.log($event);
    }

    onSwipe($event) {
        if ($event.swipeType === 'moveend') {
            this.standIndex = $event.dirX === 'right' && this.standIndex === 0 ?
                0 : $event.dirX === 'right' ? this.standIndex - 1 :
                    (this.standIndex + 1 === this.stand.length) ?
                        this.standIndex : this.standIndex + 1;

            this.router.navigate([`deelnemer/deelnemer/${this.stand[this.standIndex].id}/matches/`]);

        }
    }

    onDoubleTap($event) {
        console.log($event);
    }

    onPress($event) {
        console.log($event);
    }
}
