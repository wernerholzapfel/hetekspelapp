import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-halloffame',
    templateUrl: './halloffame.page.html',
    styleUrls: ['./halloffame.page.scss'],
})
export class HalloffamePage implements OnInit {

    tournaments: { jaar: string, aantal: number, halloffame: { naam: string, positie: number }[] }[] = [];

    constructor() {
        this.tournaments = [{
            jaar: 'Eindwinnaars WK 2014',
            aantal: 168,
            halloffame: [{
                naam: 'Tamar Vloedgraven',
                positie: 1
            }, {
                naam: 'Peer Donders',
                positie: 2
            }, {
                naam: 'Frank Buis',
                positie: 3
            }]
        }, {
            jaar: 'Winnaars na poule - wedstrijden WK 2014',
            aantal: 168,
            halloffame: [{
                naam: 'Wim Holzapfel',
                positie: 1
            }, {
                naam: 'Paul Meijerink',
                positie: 2
            }, {
                naam: 'Patrick Speijers',
                positie: 3
            }]
        }, {
            jaar: 'Eindwinnaars EK 2012',
            aantal: 154,
            halloffame: [{
                naam: 'Rogier Alarm',
                positie: 1
            }, {
                naam: 'Rense Praamstra',
                positie: 2
            }, {
                naam: 'Marvin de Ruiter',
                positie: 3
            }]
        }, {
            jaar: 'Winnaars na poule - wedstrijden EK 2012',
            aantal: 154,
            halloffame: [{
                naam: 'Maikel Staring',
                positie: 1
            }, {
                naam: 'Renske Praamstra',
                positie: 2
            }, {
                naam: 'Hermien Koers',
                positie: 2
            }]
        }, {
            jaar: 'Eindwinnaars WK 2010',
            aantal: 147,
            halloffame: [{
                naam: 'Chantal Garstenveld',
                positie: 1
            }, {
                naam: 'Dimitri Fioole',
                positie: 2
            }, {
                naam: 'Michelle Wijsman',
                positie: 3
            }]
        },
            {
                jaar: 'Winnaars na poule - wedstrijden WK 2010',
                aantal: 147,
                halloffame: [{
                    naam: 'Justin Kuipers',
                    positie: 1
                }, {
                    naam: 'Maurice Berndsen',
                    positie: 2
                }, {
                    naam: 'Jasper van Maanen',
                    positie: 2
                }]
            }, {
                jaar: 'Eindwinnaars EK 2008',
                aantal: 120,
                halloffame: [{
                    naam: 'Anne Knoef',
                    positie: 1
                }, {
                    naam: 'Emiel Maarschalkerweerd',
                    positie: 2
                }, {
                    naam: 'Niek Leemreize',
                    positie: 3
                }]
            }, {
                jaar: 'Winnaars na poule - wedstrijden EK 2008',
                aantal: 120,
                halloffame: [{
                    naam: 'Michelle Wijsman',
                    positie: 1
                }, {
                    naam: 'Werner Holzapfel',
                    positie: 2
                }, {
                    naam: 'Eduardo Serrano',
                    positie: 3
                }]
            }, {
                jaar: 'Eindwinnaars WK 2006',
                aantal: 116,
                halloffame: [{
                    naam: 'Tom Luttikhold',
                    positie: 1
                }, {
                    naam: 'Frank Letteboer',
                    positie: 2
                }, {
                    naam: 'Ronald Eitens',
                    positie: 3
                }]
            }, {
                jaar: 'Eindwinnaars WK 2004',
                aantal: 85,
                halloffame: [{
                    naam: 'Maikel Staring',
                    positie: 1
                }, {
                    naam: 'Rene van Hoorn',
                    positie: 2
                }, {
                    naam: 'Harm groot Wesseldijk',
                    positie: 3
                }]
            }
        ];
    }

    ngOnInit() {
    }

}
