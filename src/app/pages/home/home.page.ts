import {Component, OnDestroy, OnInit} from '@angular/core';
import {UiService} from '../../services/ui.service';
import {takeUntil} from 'rxjs/operators';
import {IStandLine} from '../../models/stand.model';
import {combineLatest, Observable, Subject} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {IParticipant} from '../../models/participant.model';
import {MatchService} from '../../services/match.service';

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

    constructor(private uiService: UiService, public authService: AuthService, private matchService: MatchService) {
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
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.unsubscribe();
    }
}
