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
        this.poulepredictionService.getPoulePredictions().subscribe(
            poulePrediction => {

                this.poules = [{poule: 'A', stand: poulePrediction.filter(p => p.poule === 'A'), isSortDisabled: true},
                    {poule: 'B', stand: poulePrediction.filter(p => p.poule === 'B'), isSortDisabled: true},
                    {poule: 'C', stand: poulePrediction.filter(p => p.poule === 'C'), isSortDisabled: true},
                    {poule: 'D', stand: poulePrediction.filter(p => p.poule === 'D'), isSortDisabled: true},
                    {poule: 'E', stand: poulePrediction.filter(p => p.poule === 'E'), isSortDisabled: true},
                    {poule: 'F', stand: poulePrediction.filter(p => p.poule === 'F'), isSortDisabled: true}];
            });
    }


    getMatchPredictions(poule: string) {
        if (this.allMatchPredictions.length > 0) {
            return this.allMatchPredictions.filter(m => m.match.poule === poule);
        }
    }

    save() {
        this.poulepredictionService.savePoulePredictions(this.poules).subscribe();
    }
}
