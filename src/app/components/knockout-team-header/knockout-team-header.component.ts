import {Component, Input, OnInit} from '@angular/core';
import {ITeam} from '../../models/poule.model';

@Component({
  selector: 'app-knockout-team-header',
  templateUrl: './knockout-team-header.component.html',
  styleUrls: ['./knockout-team-header.component.scss'],
})
export class KnockoutTeamHeaderComponent implements OnInit {

  @Input() team: ITeam;
  @Input() punten: number;

  constructor() {
  }

  ngOnInit() {
  }

}
