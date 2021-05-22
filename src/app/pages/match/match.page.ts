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

    match: IMatch;
    unsubscribe = new Subject<void>();
    searchTerm$: BehaviorSubject<string> = new BehaviorSubject('');

    constructor(private matchService: MatchService,
                private route: ActivatedRoute,
                private router: Router,
                private uiService: UiService) {
    }

    ngOnInit() {
        combineLatest([
            this.uiService.totaalstand$,
            this.matchService.getMatch(this.route.snapshot.params.id),
            this.searchTerm$])
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(([stand, match, searchTerm]) => {
                if (stand.length > 0) {
                    this.match = {
                        ...match,
                        matchPredictions: this.uiService.filterDeelnemers(searchTerm, match.matchPredictions.map(mp => {
                            return {
                                ...mp,
                                tableLine: stand.find(line => line.id === mp.participant.id)
                            };
                        }).sort((a, b) => a.tableLine.position - b.tableLine.position))
                    };
                }
            });
    }

    navigateToParticipant(participantId) {
        this.router.navigate([`deelnemer/deelnemer/${participantId}/matches/`]);
    }

    search($event) {
        this.searchTerm$.next($event.detail.value);
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.unsubscribe();
    }
}
