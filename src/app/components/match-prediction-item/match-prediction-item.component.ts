import {Component, Input, OnInit} from '@angular/core';
import {IMatchPrediction} from '../../models/participant.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-match-prediction-item',
  templateUrl: './match-prediction-item.component.html',
  styleUrls: ['./match-prediction-item.component.scss'],
})
export class MatchPredictionItemComponent implements OnInit {

  @Input() prediction: IMatchPrediction;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  openMatch(matchId: string) {
    this.router.navigate([`match/${matchId}`], {replaceUrl: true});
  }

}
