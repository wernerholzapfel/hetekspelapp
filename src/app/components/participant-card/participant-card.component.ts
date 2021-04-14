import {Component, Input, OnInit} from '@angular/core';
import {IStandLine} from '../../models/stand.model';

@Component({
  selector: 'app-participant-card',
  templateUrl: './participant-card.component.html',
  styleUrls: ['./participant-card.component.scss'],
})
export class ParticipantCardComponent implements OnInit {

  @Input() standLine: IStandLine;
  @Input() lastUpdated: number;
  @Input() color = 'primary';

  constructor() {
  }

  ngOnInit() {
  }

}
