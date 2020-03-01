import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {MatchService} from '../../../services/match.service';
import {IMatchPrediction} from '../../../models/participant.model';
import {PoulepredictionService} from '../../../services/pouleprediction.service';

@Component({
    selector: 'app-poule',
    templateUrl: './poule.page.html',
    styleUrls: ['./poule.page.scss'],
})
export class PoulePage implements OnInit {

    unsubscribe = new Subject<void>();
    matchPredictions: IMatchPrediction[];
    allMatchPredictions: IMatchPrediction[];
    poules = [];

    constructor(private matchService: MatchService,
                private poulepredictionService: PoulepredictionService) {
    }

    ngOnInit() {
        this.matchService.getMatchPredictions().subscribe(
            matchPredictions => {
                this.allMatchPredictions = matchPredictions;
                this.poules = [{pouleName: 'A', isSortDisabled: true},
                    {pouleName: 'B', isSortDisabled: true},
                    {pouleName: 'C', isSortDisabled: true},
                    {pouleName: 'D', isSortDisabled: true},
                    {pouleName: 'E', isSortDisabled: true},
                    {pouleName: 'F', isSortDisabled: true}];
            });
    }


    getMatchPredictions(poule: string) {
        if (this.allMatchPredictions.length > 0) {
            return this.allMatchPredictions.filter(m => m.match.poule === poule);
        }
    }

    save() {
        this.poulepredictionService.savePoulePredictions(this.poules);
    }
}
