import {Component, Input, OnInit} from '@angular/core';
import {IMatchPrediction} from '../../models/participant.model';
import {UiService} from '../../services/ui.service';
import {MatchService} from '../../services/match.service';
import {ToastService} from '../../services/toast.service';

@Component({
    selector: 'app-match-card',
    templateUrl: './match-card.component.html',
    styleUrls: ['./match-card.component.scss'],
})
export class MatchCardComponent implements OnInit {

    @Input() isRegistrationOpen: boolean;
    @Input() matchPrediction: IMatchPrediction;
    isLoading = false;
    isLoadingColor = 'primary';

    constructor(private uiService: UiService, private matchService: MatchService, private toastService: ToastService) {
    }

    ngOnInit() {
    }

    updateWedstrijdScore(matchPrediction: IMatchPrediction, homeScore: number, awayScore: number) {
        this.matchPrediction = {...matchPrediction, homeScore, awayScore};
        this.save();

    }

    save() {
        if (!(this.matchPrediction.homeScore === null) && !(this.matchPrediction.awayScore === null)) {
            this.isLoading = true;
            this.matchService.saveMatchPrediction(this.matchPrediction)
                .subscribe(result => {
                    this.isLoading = false;
                    this.isLoadingColor = 'primary';
                    this.matchPrediction = {...this.matchPrediction, id: result.id};

                    this.uiService.matchPredictions$.next(this.uiService.matchPredictions$.getValue()
                        .map(mp => {
                            if (mp.match.id === this.matchPrediction.match.id) {
                                return {...this.matchPrediction};
                            } else {
                                return mp;
                            }
                        }));
                }, error => {
                    this.isLoading = false;
                    this.isLoadingColor = 'danger';
                    this.toastService.presentToast(error && error.error && error.error.message ? error.error.message : 'Er is iets misgegaan', 'warning');
                });
        }
    }
}
