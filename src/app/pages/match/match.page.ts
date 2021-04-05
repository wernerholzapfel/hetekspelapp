import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatchService} from '../../services/match.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IMatch} from '../../models/poule.model';
import {takeUntil} from 'rxjs/operators';
import {UiService} from '../../services/ui.service';
import {combineLatest, Subject} from 'rxjs';

@Component({
    selector: 'app-match',
    templateUrl: './match.page.html',
    styleUrls: ['./match.page.scss'],
})
export class MatchPage implements OnInit, OnDestroy {

    match: IMatch
    unsubscribe = new Subject<void>();

    constructor(private matchService: MatchService,
                private route: ActivatedRoute,
                private router: Router,
                private uiService: UiService) {
    }

    ngOnInit() {
        combineLatest([
            this.uiService.totaalstand$,
            this.matchService.getMatch(this.route.snapshot.params.id)])
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(([stand, match]) => {
                this.match = {
                    ...match,
                    matchPredictions: match.matchPredictions.map(mp => {
                        return {
                            ...mp,
                            tableLine: stand.find(line => line.id === mp.participant.id)
                        };
                    }).sort((a, b) => a.tableLine.position - b.tableLine.position)
                };
            })
    }

    navigateToParticipant(participantId) {
        this.router.navigate([`deelnemer/deelnemer/${participantId}/matches/`]);
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.unsubscribe();
    }
}
