import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatchService} from '../../services/match.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IMatch} from '../../models/poule.model';
import {takeUntil} from 'rxjs/operators';
import {UiService} from '../../services/ui.service';
import {BehaviorSubject, combineLatest, Subject} from 'rxjs';

@Component({
    selector: 'app-match',
    templateUrl: './match.page.html',
    styleUrls: ['./match.page.scss'],
})
export class MatchPage implements OnInit, OnDestroy {

    showFilter = false;
    match: IMatch;
    uitslagen: { homeScore: number, awayScore: number, count?: number, aantal?: number }[];
    unsubscribe = new Subject<void>();
    searchTerm$: BehaviorSubject<string> = new BehaviorSubject('');
    uitslag$: BehaviorSubject<{ homeScore: number, awayScore: number }> = new BehaviorSubject(null);

    constructor(private matchService: MatchService,
                private route: ActivatedRoute,
                private router: Router,
                private uiService: UiService) {
    }

    ngOnInit() {
        combineLatest([
            this.uiService.totaalstand$,
            this.matchService.getMatch(this.route.snapshot.params.id),
            this.searchTerm$,
            this.uitslag$])
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(([stand, match, searchTerm, uitslag]) => {

                this.uitslagen = [];
                const map = new Map();
                for (const item of match.matchPredictions) {
                    if (!map.has(`${item.homeScore}-${item.awayScore}`)) {
                        map.set(`${item.homeScore}-${item.awayScore}`, true);    // set any value to Map
                        this.uitslagen.push({
                            homeScore: item.homeScore,
                            awayScore: item.awayScore,
                        });
                    }
                }
                if (stand.length > 0) {
                    this.match = {
                        ...match,
                        matchPredictions: this.uiService.filterDeelnemers(searchTerm, match.matchPredictions.map(mp => {
                            return {
                                ...mp,
                                tableLine: stand.find(line => line.id === mp.participant.id)
                            };
                        }).sort((a, b) => a.tableLine.position - b.tableLine.position))
                            .filter(mp => !uitslag || mp.homeScore === uitslag.homeScore && mp.awayScore === uitslag.awayScore)
                    };

                    this.uitslagen = this.uitslagen.map(uitslagMap => {
                        return {
                            ...uitslagMap,
                            aantal: match.matchPredictions.filter(mpMap =>
                                mpMap.homeScore === uitslagMap.homeScore && mpMap.awayScore === uitslagMap.awayScore).length,
                            count: match.matchPredictions.filter(mpMap =>
                                mpMap.homeScore === uitslagMap.homeScore && mpMap.awayScore === uitslagMap.awayScore).length /
                                match.matchPredictions.length
                        };
                    }).sort((a, b) => b.count - a.count);
                }
            });
    }

    navigateToParticipant(participantId) {
        this.router.navigate([`deelnemer/deelnemer/${participantId}/matches/`], {replaceUrl: true});
    }

    search($event) {
        this.searchTerm$.next($event.detail.value);
    }

    filterUitslag(uitslag) {
        this.uitslag$.next(uitslag);
        this.showFilter = false;
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.unsubscribe();
    }
}
