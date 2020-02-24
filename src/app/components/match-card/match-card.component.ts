import {Component, Input, OnInit} from '@angular/core';
import {IMatch} from '../../poule.model';
import {VoorspellingHelperService} from '../../services/voorspelling-helper.service';

@Component({
    selector: 'app-match-card',
    templateUrl: './match-card.component.html',
    styleUrls: ['./match-card.component.scss'],
})
export class MatchCardComponent implements OnInit {

    @Input() isRegistrationOpen: Boolean;
    @Input() matches: IMatch[];

    constructor(private voorspellingHelper: VoorspellingHelperService) {
    }

    ngOnInit() {
    }

    updateWedstrijdScore(match, homeScore, awayScore) {
        this.matches = this.matches.map(item => {
            if (item.id === match.id) {
                return {
                    ...item, predictedHomeScore: homeScore, predictedAwayScore: awayScore
                };
            } else {
                return item;
            }
        });
        this.voorspellingHelper.berekenStand(this.matches);
    }
}
