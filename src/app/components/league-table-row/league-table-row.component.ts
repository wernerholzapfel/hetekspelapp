import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ITableLine} from '../../models/poule.model';
import {IonSelect} from '@ionic/angular';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-league-table-row',
    templateUrl: './league-table-row.component.html',
    styleUrls: ['./league-table-row.component.scss'],
})
export class LeagueTableRowComponent implements OnInit {

    @ViewChild('mySelect') selectRef: IonSelect;
    @Input() line: ITableLine;
    @Input() admin: boolean;
    @Input() isSortDisabled: boolean;
    @Input() index: number;
    @Input() isRegistrationOpen$: Observable<boolean>;

    constructor() {
    }

    ngOnInit() {
    }

    openSelect() {
        this.selectRef.open();
    }

}
