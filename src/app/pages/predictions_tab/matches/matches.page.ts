import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {IMatchPrediction} from '../../../models/participant.model';
import {VoorspellingHelperService} from '../../../services/voorspelling-helper.service';
import {MatchService} from '../../../services/match.service';
import {Router} from '@angular/router';
import {ToastService} from '../../../services/toast.service';
import {UiService} from '../../../services/ui.service';
import {findIndex} from 'rxjs/operators';

@Component({
    selector: 'app-matches',
    templateUrl: './matches.page.html',
    styleUrls: ['./matches.page.scss'],
})
export class MatchesPage {
    public pouleName = 'A';
    isRegistrationOpen = true;
    matchPredictions: IMatchPrediction[];
    allMatchPredictions: IMatchPrediction[];
    unsubscribe = new Subject<void>();
    buttonText = 'Opslaan';
    pouleNavigatie = [{
        current: 'A',
        next: 'B'
    }, {
        current: 'B',
        next: 'C'
    }, {
        current: 'C',
        next: 'D'
    }, {
        current: 'D',
        next: 'E'
    }, {
        current: 'E',
        next: 'F'
    }]

    constructor(private voorspellingHelper: VoorspellingHelperService,
                private matchService: MatchService,
                private router: Router,
                private uiService: UiService,
                private toastService: ToastService) {
    }

    ionViewWillEnter() {
        this.matchService.getMatchPredictions().subscribe(
            matchPredictions => {
                this.allMatchPredictions = matchPredictions;
                this.setMatches();
            });
    }

    canDeactivate(): Observable<boolean> | Promise<boolean> {
        if (this.uiService.isDirty.value) {
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
        }
    }

    setMatches() {
        this.matchPredictions = this.allMatchPredictions.filter(mp => mp.match.poule === this.pouleName);
        this.voorspellingHelper.berekenStand(this.matchPredictions, true);
    };

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
        this.voorspellingHelper.berekenStand(this.matchPredictions, true);
        this.uiService.isDirty.next(true);
    }

    next() {
        this.pouleName = this.pouleNavigatie.find(p => p.current === this.pouleName).next
        this.scrollSegments(this.pouleNavigatie.findIndex(poule => poule.next === this.pouleName));
        if (this.uiService.isDirty.value) {
            this.save(false);
        }
        this.setMatches();
    }

    save(navigeer: boolean) {
        this.matchService.saveMatchPredictions(this.matchPredictions).subscribe(result => {
            this.uiService.isDirty.next(false);
            this.toastService.presentToast('Opslaan is gelukt')

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
            this.toastService.presentToast('Er is iets misgegaan', 'warning')

        });
    }

    ionViewDidLeave(): void {
        this.matchPredictions = [];
        this.allMatchPredictions = [];
        this.unsubscribe.next();
        this.unsubscribe.unsubscribe();

    }
}
