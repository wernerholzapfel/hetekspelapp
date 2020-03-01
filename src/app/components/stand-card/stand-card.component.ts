import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ITableLine} from '../../models/poule.model';
import {VoorspellingHelperService} from '../../services/voorspelling-helper.service';
import {IonReorderGroup} from '@ionic/angular';
import {IMatchPrediction} from '../../models/participant.model';
import {PoulepredictionService} from '../../services/pouleprediction.service';

@Component({
    selector: 'app-stand-card',
    templateUrl: './stand-card.component.html',
    styleUrls: ['./stand-card.component.scss'],
})
export class StandCardComponent implements OnInit {
    @ViewChild(IonReorderGroup, {static: true}) reorderGroup: IonReorderGroup;

    constructor(private voorspellingHelper: VoorspellingHelperService, private poulepredictionService: PoulepredictionService) {
    }

    @Input() poule: { pouleName: string, isSortDisabled: boolean };
    @Input() matchesPrediction: IMatchPrediction[];

    public stand: ITableLine[];

    ngOnInit() {
        this.stand = this.voorspellingHelper.berekenStand(this.matchesPrediction, true);
    }

    doReorder(ev: any) {
        // Before complete is called with the items they will remain in the
        // order before the drag
        console.log('Before complete', this.stand);

        // Finish the reorder and position the item in the DOM based on
        // where the gesture ended. Update the items variable to the
        // new order of items
        this.stand = ev.detail.complete(this.stand).map((line, index) => {
            return {
                ...line,
                positie: index + 1
            };
        });

        // After complete is called the items will be in the new order
        console.log('After complete', this.stand);
    }

    toggleReorderGroup() {
        this.poule.isSortDisabled = !this.poule.isSortDisabled;
    }

    save() {
        this.poulepredictionService.savePoulePredictions(this.stand.map(line => {
            return {
                poule: this.poule.pouleName,
                team: line.team,
                position: line.positie,
                thirdPositionScore: line.thirdPositionScore
            };
        })).subscribe(response => {
            console.log(response);
        });
    }
}
