import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-halloffame',
    templateUrl: './halloffame.page.html',
    styleUrls: ['./halloffame.page.scss'],
})
export class HalloffamePage implements OnInit {

    tournaments: { jaar: number, aantal: number, halloffame: { naam: string, positie: number }[] }[] = [];

    constructor() {
        this.tournaments = [{
            jaar: 2012,
            aantal: 154,
            halloffame: [{
                naam: 'Rogier Alarm (Meppel)',
                positie: 1
            }, {
                naam: 'Rense Praamstra (Arnhem)',
                positie: 2
            }, {
                naam: 'Marvin de Ruiter (Velp Gld)',
                positie: 3
            }]
        }];
    }

    ngOnInit() {
    }

}
