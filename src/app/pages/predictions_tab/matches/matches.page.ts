import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {IMatchPrediction} from '../../../models/participant.model';
import {VoorspellingHelperService} from '../../../services/voorspelling-helper.service';
import {MatchService} from '../../../services/match.service';

@Component({
    selector: 'app-matches',
    templateUrl: './matches.page.html',
    styleUrls: ['./matches.page.scss'],
})
export class MatchesPage implements OnInit, OnDestroy {
    public pouleName = 'A';
    isRegistrationOpen = true;
    matchPredictions: IMatchPrediction[];
    allMatchPredictions: IMatchPrediction[];
    unsubscribe = new Subject<void>();
    buttonText = 'Opslaan';

    constructor(private voorspellingHelper: VoorspellingHelperService, private matchService: MatchService) {
    }

    selectPoule($event) {
        this.pouleName = $event.detail.value;
        this.setMatches();
    }

    scrollSegments(index: number) {
        const segment = document.querySelector('ion-segment');
        const active = segment.querySelectorAll('ion-segment-button')[index];
        active.scrollIntoView({behavior: 'smooth', inline: 'center'});

    }
    ngOnInit() {
        this.matchService.getMatchPredictions().subscribe(
            matchPredictions => {
                this.allMatchPredictions = matchPredictions;
                this.setMatches();
            });
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
        this.voorspellingHelper.berekenStand(this.matchPredictions, true);
    }

    save() {
        console.log(this.matchPredictions);
        this.matchService.saveMatchPredictions(this.matchPredictions).subscribe(result => {
            this.matchPredictions = this.matchPredictions.map(mp => {
                if (result.map(item => item.match.id).includes(mp.match.id)) {
                    return {...mp, id: result.find(item => item.match.id === mp.match.id).id};
                } else {
                    return {...mp};
                }
            });
            //     // this.toastService.presentToast('Wedstrijden opgeslagen');
        });
    }

    // add back when alpha.4 is out
    // navigate(item) {
    //   this.router.navigate(['/list', JSON.stringify(item)]);
    // }

    // async slideChanged() {
    //     this.activeIndex= await this.slider.getActiveIndex();
    //     document.getElementById("segment-" + activeIndex).scrollIntoView({
    //         behavior: 'smooth',
    //         block: 'center',
    //         inline: 'center'
    //     });
    // }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.unsubscribe();
    }
}
