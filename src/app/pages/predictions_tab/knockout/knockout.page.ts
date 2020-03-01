import {Component, OnInit} from '@angular/core';
import {PoulepredictionService} from '../../../services/pouleprediction.service';
import {IPoulePrediction} from '../../../models/participant.model';

@Component({
    selector: 'app-knockout',
    templateUrl: './knockout.page.html',
    styleUrls: ['./knockout.page.scss'],
})
export class KnockoutPage implements OnInit {

    constructor(private poulePredictionService: PoulepredictionService) {
    }

    private nummerDries: IPoulePrediction[];
    private nummerDrieIdentifier: string;

    ngOnInit() {

        this.poulePredictionService.getPoulePredictions().subscribe(pp => {

            // determine which poules have the best nr 3. {0-3}
            this.nummerDries = pp.filter(item => item.position === 3)
                .sort((a, b) => b.thirdPositionScore - a.thirdPositionScore)
                .slice(0, 4);

            this.nummerDrieIdentifier = this.nummerDries.sort((a, b) => {
                if (b.poule > a.poule) {
                    return -1;
                }
                if (a.poule > b.poule) {
                    return 1;
                }
                return 0;
            }).reduce((acc: string, val) => acc + val.poule, '');

            // find the right spot for the team in the knockout stage.


        });

    }

    select() {

    }

}


// To determine the four best third-placed teams, the following criteria are applied,
// in the order given:
// a. higher number of points;
// b. superior goal difference;
// c. higher number of goals scored;
// d. higher number of wins;
// e. lower disciplinary points total based only on yellow and red cards received in
// all group matches (red card = 3 points, yellow card = 1 point, expulsion for
// two yellow cards in one match = 3 points);
// f. position in the overall European Qualifiers rankings (see Article 23).

// The table below shows the different options for the round of 16 pairings,
// depending on which third-placed teams qualify from the final tournament group
// matches. For example, if the teams finishing third in groups A, B, C and D qualify,
// the pairings will be WB v 3A, WC v 3D, WE v 3B, WF v 3C.
// The four best-placed
// teams are: WB WC WE WF
// A B C D 3A 3D 3B 3C
// A B C E 3A 3E 3B 3C
// A B C F 3A 3F 3B 3C
// A B D E 3D 3E 3A 3B
// A B D F 3D 3F 3A 3B
// A B E F 3E 3F 3B 3A
// A C D E 3E 3D 3C 3A
// A C D F 3F 3D 3C 3A
// A C E F 3E 3F 3C 3A
// A D E F 3E 3F 3D 3A
// B C D E 3E 3D 3B 3C
// B C D F 3F 3D 3C 3B
// B C E F 3F 3E 3C 3B
// B D E F 3F 3E 3D 3B
// C D E F 3F 3E 3D 3C
