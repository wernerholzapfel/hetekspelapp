import {Component, OnInit} from '@angular/core';
import {PoulepredictionService} from '../../../services/pouleprediction.service';
import {IPoulePrediction} from '../../../models/participant.model';
import {IKnockout} from '../../../models/knockout.model';
import {ITeam} from '../../../models/poule.model';

@Component({
    selector: 'app-knockout',
    templateUrl: './knockout.page.html',
    styleUrls: ['./knockout.page.scss'],
})
export class KnockoutPage implements OnInit {
    // Todo.
    // Ophalen speelschema, ophalen predictions, dan die mergen
    // Zorgen dat je ook opnieuw kan updaten.
    //

    constructor(private poulePredictionService: PoulepredictionService) {
    }

    public activeKnockoutRound = '16';
    public speelschema: IKnockout[];
    private nummerDries: IPoulePrediction[];
    private nummerDrieIdentifier: string;
    private poules: any[];
    public segmentIndex = 1;

    public rounds = [{
        round: '16',
        text: '1/8 F'
    }, {
        round: '8',
        text: '1/4 F'
    }, {
        round: '4',
        text: '1/2 F'
    }, {
        round: '2',
        text: 'F'
    },
    ]

    ngOnInit() {

        this.poulePredictionService.getPoulePredictions().subscribe(pp => {

            this.poules = pp;

            // determine which poules have the best nr 3. {0-3}
            this.nummerDries = pp.filter(item => item.positie === 3)
                .sort((a, b) => b.thirdPositionScore - a.thirdPositionScore)
                .slice(0, 4);

            console.log(this.nummerDries);

            this.nummerDrieIdentifier = this.nummerDries.sort((a, b) => {
                if (b.poule > a.poule) {
                    return -1;
                }
                if (a.poule > b.poule) {
                    return 1;
                }
                return 0;
            }).reduce((acc: string, val) => acc + val.poule, '');


            console.log(this.nummerDrieIdentifier);
            // find the right spot for the team in the knockout stage.
            const thirdplaces = this.poulePredictionService.getPositionForThirdPlacedTeams(this.nummerDrieIdentifier)

            this.poulePredictionService.getSpeelschemaKnockoutRound().subscribe(speelschema => {
                this.speelschema = speelschema.map(match => {
                    switch (match.awayId) {
                        case 'WB':
                            match.awayId = thirdplaces.WB
                            break;
                        case 'WC':
                            match.awayId = thirdplaces.WC
                            break;
                        case 'WE':
                            match.awayId = thirdplaces.WE
                            break;
                        case 'WF':
                            match.awayId = thirdplaces.WF
                            break;
                        default:
                        // code block
                    }
                    return {
                        ...match,
                        homeTeam: this.setTeam(speelschema, match.homeId, match.round),
                        awayTeam: this.setTeam(speelschema, match.awayId, match.round)
                    }
                });
                console.log(this.speelschema);
            });
        });
    }

    setTeam(speelschema, id, round): ITeam {
        if (round === '16') {
            return this.poules.find(p => id === `${p.positie}${p.poule}`).team
        } else {
            const matchWinner = speelschema.find(sp => sp.matchId === id)
            return matchWinner && matchWinner.prediction ?
                matchWinner.prediction.selectedTeam :
                matchWinner.selectedTeam ?
                    matchWinner.homeTeam.id === matchWinner.selectedTeam.id ?
                        matchWinner.homeTeam :
                        matchWinner.awayTeam :
                    {name: id}
        }
    }


    selectKnockoutRound($event) {
        this.activeKnockoutRound = $event.detail.value;
    }

    scrollSegments(index: number) {
        this.segmentIndex = index - 1;
        const segment = document.querySelector('ion-segment');
        const active = segment.querySelectorAll('ion-segment-button')[index];
        if (active) {
            active.scrollIntoView({behavior: 'smooth', inline: 'center'});
        }
    }

    setSelectedTeam(match: IKnockout, $event) {
        this.speelschema = this.speelschema
            .map(m => {
                if (m.id === match.id) {
                    return {
                        ...m,
                        selectedTeam: {id: $event.detail.value}
                    }
                } else {
                    return m;
                }
            })

        const matchToUpdate = this.speelschema.find(m => m.homeId === match.matchId || m.awayId === match.matchId)
        this.speelschema = this.speelschema.map(m => {
            if (matchToUpdate && m.matchId === matchToUpdate.matchId) {
                if (m.homeId === match.matchId) {
                    return {
                        ...m,
                        homeTeam: this.setTeam(this.speelschema, m.homeId, m.round)
                    }
                } else {
                    return {
                        ...m,
                        awayTeam: this.setTeam(this.speelschema, m.awayId, m.round)
                    }
                }
            } else {
                return m;
            }
        })
        console.log(this.speelschema)
    }

    goToNextSlide() {
        this.save();
        this.activeKnockoutRound = this.rounds[this.segmentIndex].round
    }

    save() {
        this.poulePredictionService.saveKnockoutPredictions(
            this.speelschema.filter(sp => sp.selectedTeam && sp.selectedTeam.id).map(sp => {
                if (sp.prediction && sp.prediction.id) {
                    return {
                        id: sp.prediction.id,
                        selectedTeam: sp.selectedTeam,
                        knockout: {id: sp.id},
                    }
                } else
                    return {
                        selectedTeam: sp.selectedTeam,
                        knockout: {id: sp.id},
                    }
            })).subscribe(response => {
            this.speelschema = this.speelschema.map(item => {
                    return {
                        ...item,
                        prediction: response.find(r => r.knockout.id === item.id)
                    };
                }
            )
        });
    }

    canIGoToNextStep(): boolean {
        const matchesInActiveRound = this.speelschema?.filter(sp => sp.round === this.activeKnockoutRound)
        const matchesInActiveRoundWithSelectedTeam = matchesInActiveRound?.filter(av => av.selectedTeam)

        return (this.speelschema &&
            matchesInActiveRound.length === matchesInActiveRoundWithSelectedTeam.length)
    }

    errorInform(): boolean {
        return this.speelschema &&
            (this.speelschema.filter(sp => sp.selectedTeam).length !== this.speelschema.length ||
                this.speelschema.filter(match => match.selectedTeam &&
                    (match.selectedTeam.id !== match.homeTeam.id &&
                        match.selectedTeam.id !== match.awayTeam.id)).length > 0);
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
