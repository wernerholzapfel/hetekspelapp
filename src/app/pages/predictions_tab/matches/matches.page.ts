import {Component, ElementRef, ViewChild} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {IMatchPrediction} from '../../../models/participant.model';
import {VoorspellingHelperService} from '../../../services/voorspelling-helper.service';
import {MatchService} from '../../../services/match.service';
import {Router} from '@angular/router';
import {ToastService} from '../../../services/toast.service';
import {UiService} from '../../../services/ui.service';

@Component({
    selector: 'app-matches',
    templateUrl: './matches.page.html',
    styleUrls: ['./matches.page.scss'],
})
export class MatchesPage {
    @ViewChild('topScrollAnchor') topScroll: ElementRef;

    public pouleName = 'A';
    matchPredictions: IMatchPrediction[];
    allMatchPredictions: IMatchPrediction[];
    unsubscribe = new Subject<void>();
    buttonText = 'Opslaan';
    pouleNavigatie = [
        {
            current: 'A',
            next: 'B',
            disabled: false,
            text: 'Poule A'
        }, {
            current: 'B',
            next: 'C',
            disabled: true,
            text: 'Poule B'
        }, {
            current: 'C',
            next: 'D',
            disabled: true,
            text: 'Poule C'
        }, {
            current: 'D',
            next: 'E',
            disabled: true,
            text: 'Poule D'
        }, {
            current: 'E',
            next: 'F',
            disabled: true,
            text: 'Poule E'
        }, {
            current: 'F',
            next: null,
            disabled: true,
            text: 'Poule F'
        }];
    poule: { poule: string, stand: any[], isSortDisabled: boolean };

    constructor(private voorspellingHelper: VoorspellingHelperService,
                private matchService: MatchService,
                private router: Router,
                public uiService: UiService,
                private toastService: ToastService) {
    }

    ionViewWillEnter() {

        this.matchService.getMatchPredictions().subscribe(
            matchPredictions => {
                this.allMatchPredictions = matchPredictions;
                this.setMatches();
                this.setSegmentsActive();
            });
    }

    canDeactivate(): Observable<boolean> | Promise<boolean> {
        if (this.uiService.isDirty$.value) {
            return this.toastService.presentAlertConfirm().then(alertResponse => {
                return alertResponse;
            });
        } else {
            return of(true);
        }
    }

    selectPoule($event) {
        this.pouleName = $event.detail.value;
        this.setMatches();
    }

    scrollSegments(index: number) {
        const segment = document.querySelector('ion-segment');
        const active = segment.querySelectorAll('ion-segment-button')[index];
        if (active) {
            active.scrollIntoView({behavior: 'smooth', inline: 'center'});
            setTimeout(() => this.topScroll.nativeElement.scrollIntoView({behavior: 'smooth'}), 500);
        }
    }

    setMatches() {
        this.matchPredictions = this.allMatchPredictions.filter(mp => mp.match.poule === this.pouleName);
        this.voorspellingHelper.berekenStand(this.matchPredictions, true);
    }

    setSegmentsActive() {
        this.pouleNavigatie = this.pouleNavigatie.map(pn => {
            if (pn.current !== 'A' && this.allMatchPredictions &&
                this.allMatchPredictions.filter(mp =>
                    mp.homeScore !== null && mp.awayScore !== null && mp.match.poule === pn.current).length ===
                this.matchPredictions.length) {
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
    }

    updateTable(event: IMatchPrediction) {
        this.matchPredictions = this.matchPredictions.map(mp => {
            if (mp.match.id === event.match.id) {
                return event;
            } else {
                return mp;
            }
        });
        this.allMatchPredictions = this.allMatchPredictions.map(mp => {
            if (mp.match.id === event.match.id) {
                return event;
            } else {
                return mp;
            }
        });
        this.uiService.isDirty$.next(true);
    }

    areActiveMatchesPredicted(): boolean {
        return this.matchPredictions &&
            this.matchPredictions.filter(mp => mp.homeScore !== null && mp.awayScore !== null).length === this.matchPredictions.length;
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
        if (this.uiService.isDirty$.value) {
            this.save(false);
        }
        this.setMatches();
    }

    save(navigeer: boolean) {
        this.matchService.saveMatchPredictions(this.matchPredictions).subscribe(result => {
            this.uiService.isDirty$.next(false);
            this.toastService.presentToast('Opslaan is gelukt');

            this.matchPredictions = this.matchPredictions.map(mp => {
                if (result.map(item => item.match.id).includes(mp.match.id)) {
                    return {...mp, id: result.find(item => item.match.id === mp.match.id).id};
                } else {
                    return {...mp};
                }
            });
            if (navigeer) {
                this.router.navigate(['prediction/prediction/poule']);
            }
        }, error => {
            this.toastService.presentToast(error && error.error && error.error.message ? error.error.message : 'Er is iets misgegaan', 'warning');

        });
    }

    ionViewDidLeave(): void {
        this.matchPredictions = [];
        this.allMatchPredictions = [];
        this.unsubscribe.next();
        this.unsubscribe.unsubscribe();

    }
}
