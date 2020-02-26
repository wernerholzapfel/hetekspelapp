import {Component, Input, OnInit} from '@angular/core';
import {ITableLine} from '../../models/poule.model';

@Component({
  selector: 'app-league-table-row',
  templateUrl: './league-table-row.component.html',
  styleUrls: ['./league-table-row.component.scss'],
})
export class LeagueTableRowComponent implements OnInit {

  @Input() line: ITableLine;
  @Input() isSortDisabled: boolean;
  @Input() index: number;
  constructor() { }

  ngOnInit() {}

}
