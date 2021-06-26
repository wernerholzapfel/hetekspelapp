import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-knockout-prediction-item',
  templateUrl: './knockout-prediction-item.component.html',
  styleUrls: ['./knockout-prediction-item.component.scss'],
})
export class KnockoutPredictionItemComponent implements OnInit {

  constructor(private router: Router) {
  }

  @Input() prediction: any;

  ngOnInit() {
  }

  openKoTeam(team, round) {
    this.router.navigate([`stats/knockout/round/${round}/team/${team}`], {replaceUrl: true});
  }
}
