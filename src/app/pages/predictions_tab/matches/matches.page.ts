import {Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {IMatchPrediction} from '../../../models/participant.model';
import {VoorspellingHelperService} from '../../../services/voorspelling-helper.service';
import {MatchService} from '../../../services/match.service';
import {Router} from '@angular/router';
import {UiService} from '../../../services/ui.service';
import {takeUntil} from 'rxjs/operators';
import {PouleNav} from '../../../models/poule.model';

@Component({
    selector: 'app-matches',
    templateUrl: './matches.page.html',
    styleUrls: ['./matches.page.scss'],
})
export class MatchesPage implements OnDestroy {
    @ViewChild('topScrollAnchor') topScroll: ElementRef;

    public pouleName = 'A';
    isRegistrationOpen$: BehaviorSubject<boolean>;
    matchPredictions: IMatchPrediction[];
    unsubscribe = new Subject<void>();
    pouleNavigatie: PouleNav[];
    activePoule: PouleNav;

    constructor(private voorspellingHelper: VoorspellingHelperService,
                private matchService: MatchService,
                private router: Router,
                private uiService: UiService) {
    }

    ionViewWillEnter() {

        this.matchService.getMatchPredictions().subscribe(
            matchPredictions => {
                this.matchPredictions = matchPredictions;
                // this.setSegmentsActive(matchPredictions);
                this.uiService.matchPredictions$.next(matchPredictions);

                this.uiService.getArePouleMatchesPredicted()
                    .pipe(takeUntil(this.unsubscribe))
                    .subscribe(response => {
                        this.pouleNavigatie = response;
                        this.activePoule = this.pouleNavigatie.find(p => p.current === this.pouleName);
                    });


            });
        this.isRegistrationOpen$ = this.uiService.isRegistrationOpen$;
    }

    selectPoule($event) {
        this.activePoule = this.pouleNavigatie.find(p => p.current === $event.detail.value);
    }

    scrollSegments(index: number) {
        const segment = document.querySelector('ion-segment');
        const active = segment.querySelectorAll('ion-segment-button')[index];
        if (active) {
            active.scrollIntoView({behavior: 'smooth', inline: 'center'});
            setTimeout(() => this.topScroll.nativeElement.scrollIntoView({behavior: 'smooth'}), 500);
        }
    }

    next() {
        const activePoule = this.pouleNavigatie.find(p => p.current === this.pouleName);
        this.pouleName = activePoule.next;
        this.pouleNavigatie = this.pouleNavigatie.map(pn => {
            if (pn.current === activePoule.next) {
                return {
                    ...pn,
                    disabled: false
                };
            } else {
                return {
                    ...pn
                };
            }
        });
        this.scrollSegments(this.pouleNavigatie.findIndex(poule => poule.next === this.pouleName));
    }

    navigateToPoulePredictions() {
        this.router.navigate([`prediction/prediction/poule/`]);
    }

    ngOnDestroy(): void {
        this.matchPredictions = [];
        this.unsubscribe.next();
        this.unsubscribe.unsubscribe();

    }
}
