import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-city-card-header',
    templateUrl: './city-card-header.component.html',
    styleUrls: ['./city-card-header.component.scss'],
})
export class CityCardHeaderComponent implements OnInit {

    @Input() match: any;

    constructor() {
    }

    ngOnInit() {
    }

}
