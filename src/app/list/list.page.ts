import {Component, OnDestroy, OnInit} from '@angular/core';
import {VoorspellingHelperService} from '../services/voorspelling-helper.service';
import {MatchService} from '../services/match.service';
import {Subject} from 'rxjs';
import {IMatchPrediction} from '../models/participant.model';

@Component({
    selector: 'app-list',
    templateUrl: 'list.page.html',
    styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit, OnDestroy {
    public pouleName = 'A';
    isRegistrationOpen = true;
    matchPredictions: IMatchPrediction[];
    allMatchPredictions: IMatchPrediction[];
    isSortDisabled = true;
    unsubscribe = new Subject<void>();

    constructor(private voorspellingHelper: VoorspellingHelperService, private matchService: MatchService) {
    }

    selectPoule($event) {
        this.pouleName = $event.detail.value;
        this.setMatches();
        this.isSortDisabled = true;
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

    toggleIsSortDisabled(event: boolean) {
        this.isSortDisabled = event;
    }

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
    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.unsubscribe();
    }
}
