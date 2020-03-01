import {Component, Input, OnInit} from '@angular/core';
import {IMatch} from '../../models/poule.model';

@Component({
    selector: 'app-city-card-header',
    templateUrl: './city-card-header.component.html',
    styleUrls: ['./city-card-header.component.scss'],
})
export class CityCardHeaderComponent implements OnInit {

    @Input() match: IMatch;

    constructor() {
    }

    ngOnInit() {
    }

}
