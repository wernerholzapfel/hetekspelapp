import {Component, OnDestroy, OnInit} from '@angular/core';
import {UiService} from '../../services/ui.service';
import {takeUntil} from 'rxjs/operators';
import {IStandLine} from '../../models/stand.model';
import {combineLatest, Observable, Subject} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {IMatchPrediction, IParticipant} from '../../models/participant.model';
import {MatchService} from '../../services/match.service';
import {Router} from '@angular/router';
import {IKnockoutPrediction} from '../../models/knockout-predictions.model';
import {IKnockout} from '../../models/knockout.model';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

    standLine: IStandLine;
    participantStandLine: IStandLine;
    lastUpdated: number;
    participant$: Observable<IParticipant>;
    fullscore$: Observable<any[]>;
    unsubscribe = new Subject<void>();
    todaysPredictions: { predictionType: string, knockout: IKnockout[], matchPredictions?: IMatchPrediction[], knockoutPredictions?: IKnockoutPrediction[] };

    constructor(private uiService: UiService,
                public authService: AuthService,
                private matchService: MatchService,
                private router: Router) {
    }

    ngOnInit() {
        combineLatest([this.uiService.totaalstand$, this.uiService.participant$])
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(([s, participant]) => {
                this.standLine = s[0];
                this.participantStandLine = s.find(line => participant && line.id === participant.id);
            });

        this.uiService.lastUpdated$
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(item => {
                this.lastUpdated = item.lastUpdated;
            });

        this.participant$ = this.uiService.participant$;

        this.fullscore$ = this.matchService.getMatchesFullScore();

        this.matchService.getTodaysMatches().subscribe(response => {
            this.todaysPredictions = response;
        });
    }

    openMatch(matchId: string) {
        this.router.navigate([`match/${matchId}`], {replaceUrl: true});
    }

    openParticipant(participantId: string) {
        this.router.navigate([`deelnemer/deelnemer/${participantId}/matches`], {replaceUrl: true});
    }


    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.unsubscribe();
    }
}
