import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {VoorspellingHelperService} from '../../services/voorspelling-helper.service';
import {IMatchPrediction} from '../../models/participant.model';

@Component({
    selector: 'app-match-card',
    templateUrl: './match-card.component.html',
    styleUrls: ['./match-card.component.scss'],
})
export class MatchCardComponent implements OnInit {

    @Input() isRegistrationOpen: boolean;
    @Input() matchPrediction: IMatchPrediction;
    @Output() emitUpdateWedstrijdScore = new EventEmitter<IMatchPrediction>();

    constructor(private voorspellingHelper: VoorspellingHelperService) {
    }

    ngOnInit() {
    }

    updateWedstrijdScore(matchPrediction: IMatchPrediction, homeScore: number, awayScore: number) {
        this.emitUpdateWedstrijdScore.emit({...matchPrediction, homeScore, awayScore});
    }
}
