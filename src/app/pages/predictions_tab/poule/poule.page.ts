import {Component} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {MatchService} from '../../../services/match.service';
import {IMatchPrediction} from '../../../models/participant.model';
import {PoulepredictionService} from '../../../services/pouleprediction.service';
import {Router} from '@angular/router';
import {ToastService} from '../../../services/toast.service';
import {UiService} from '../../../services/ui.service';

@Component({
    selector: 'app-poule',
    templateUrl: './poule.page.html',
    styleUrls: ['./poule.page.scss'],
})
export class PoulePage {

    unsubscribe = new Subject<void>();
    matchPredictions: IMatchPrediction[];
    allMatchPredictions: IMatchPrediction[];
    poules = [];

    constructor(private matchService: MatchService,
                private poulepredictionService: PoulepredictionService,
                private toastService: ToastService,
                public uiService: UiService,
                private router: Router) {
    }

    ionViewWillEnter() {
        this.poulepredictionService.getPoulePredictions().subscribe(
            poulePrediction => {
                this.uiService.isDirty$.next(this.isFirstTime(poulePrediction));
                this.poules = [{
                    poule: 'A', stand: poulePrediction.filter(p => p.poule === 'A')
                        .sort((a, b) => a.positie - b.positie),
                    isSortDisabled: true
                },
                    {
                        poule: 'B', stand: poulePrediction.filter(p => p.poule === 'B')
                            .sort((a, b) => a.positie - b.positie),
                        isSortDisabled: true
                    },
                    {
                        poule: 'C', stand: poulePrediction.filter(p => p.poule === 'C')
                            .sort((a, b) => a.positie - b.positie),
                        isSortDisabled: true
                    },
                    {
                        poule: 'D', stand: poulePrediction.filter(p => p.poule === 'D')
                            .sort((a, b) => a.positie - b.positie),
                        isSortDisabled: true
                    },
                    {
                        poule: 'E', stand: poulePrediction.filter(p => p.poule === 'E')
                            .sort((a, b) => a.positie - b.positie),
                        isSortDisabled: true
                    },
                    {
                        poule: 'F', stand: poulePrediction.filter(p => p.poule === 'F')
                            .sort((a, b) => a.positie - b.positie),
                        isSortDisabled: true
                    }];
            });
    }

    canDeactivate(): Observable<boolean> | Promise<boolean> {
        if (this.uiService.isDirty$.value && !this.arePoulesInComplete()) {
            return this.toastService.presentAlertConfirm().then(alertResponse => {
                return alertResponse;
            });
        } else {
            return of(true);
        }
    }

    getMatchPredictions(poule: string) {
        if (this.allMatchPredictions.length > 0) {
            return this.allMatchPredictions.filter(m => m.match.poule === poule);
        }
    }

    isFirstTime(poulePredictions): boolean {
        return !poulePredictions.find(p => p.id);
    }

    arePoulesInComplete(): boolean {
        const newPoules = this.poules.reduce((accumulator, poule) => [...accumulator, poule.stand], []);
        return [].concat(...newPoules).filter(item => item.gespeeld !== 3).length > 0;
    }

    save() {
        this.poulepredictionService.savePoulePredictions([
            ...this.poules[0].stand,
            ...this.poules[1].stand,
            ...this.poules[2].stand,
            ...this.poules[3].stand,
            ...this.poules[4].stand,
            ...this.poules[5].stand]).subscribe(() => {
            this.toastService.presentToast('Opslaan is gelukt');
            this.uiService.isDirty$.next(false);
            this.router.navigate(['prediction/prediction/knockout']);
        }, error => {
            this.toastService.presentToast(error && error.error && error.error.message ? error.error.message : 'Er is iets misgegaan', 'warning');

        });
    }
}
