import {Injectable} from '@angular/core';
import {IMatch, ITable, ITableLine} from '../poule.model';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class VoorspellingHelperService {

    constructor() {
    }

    standen$: BehaviorSubject<ITable[]> = new BehaviorSubject([]);


    public berekenStand(matches: IMatch[]) {
        let table: ITableLine[] = [];

        for (let match of matches) {
            let index = table.findIndex(t => t.id === match.homeTeam);

            if (index === -1) {
                table.push(this.createInitialTableLine(match.homeTeam));
            }
        }

        for (let match of matches) {
            let index = table.findIndex(t => t.id === match.awayTeam);

            if (index === -1) {
                table.push(this.createInitialTableLine(match.awayTeam));
            }
        }

        for (let match of matches) {
            table = this.updateTableLine(table, match);
        }

        table = table.map(line => {
            return {...line, sortering: this.calculateSortering(line)};
        })
            .sort((a, b) =>
                (b.sortering - a.sortering))
            .reduce((accumulator, currentValue, index) => {
                return [...accumulator, Object.assign({}, currentValue, {
                    positie: this.calculatePosition(currentValue, index, accumulator)
                })];
            }, []);

        this.standen$.next([{tableLines: table}]);
    }

    calculatePosition(tableLine: ITableLine, index, table: ITableLine[]) {
        return index > 0 && tableLine.sortering === table[index - 1].sortering ?
            table[index - 1].positie : index + 1;
    }

    calculateSortering(tableLine: ITableLine) {
        return (tableLine.punten * 10000 +
            ((tableLine.goalsFor - tableLine.goalsAgainst) * 100) +
            tableLine.goalsFor);
    }

    createInitialTableLine(team: string): ITableLine {
        return {
            id: team,
            positie: 0,
            gespeeld: 0,
            punten: 0,
            goalsFor: 0,
            goalsAgainst: 0,
            sortering: 0
        };
    }

    private updateTableLine(table: ITableLine[], match: IMatch): ITableLine[] {
        return table.map(line => {
            if (line.id === match.homeTeam) {
                return this.updateTeamLine(line, match, true);
            } else if (line.id === match.awayTeam) {
                return this.updateTeamLine(line, match, false);
            } else {
                return {...line};
            }
        });

    }

    updateTeamLine(line: ITableLine, match: IMatch, homeTeam: boolean) {
        return match.predictedHomeScore === null || match.predictedAwayScore === null ?
            {...line} :
            {
                ...line,
                gespeeld: line.gespeeld + 1,
                punten: line.punten + this.punten(homeTeam ? match.predictedHomeScore : match.predictedAwayScore, homeTeam ? match.predictedAwayScore : match.predictedHomeScore),
                goalsFor: line.goalsFor + (homeTeam ? match.predictedHomeScore : match.predictedAwayScore),
                goalsAgainst: line.goalsAgainst + (homeTeam ? match.predictedAwayScore : match.predictedHomeScore)
            };
    }

    public getPoules() {
        return [{
            pouleName: 'A',
            matches: [{
                id: '1',
                date: '12 juli 2019',
                homeTeam: 'Nederland',
                awayTeam: 'Oekraïne',
                homeScore: null,
                awayScore: null,
                predictedHomeScore: 0,
                predictedAwayScore: 0,
            }, {
                id: '2',
                date: '12 juli 2019',
                homeTeam: 'Oostenrijk',
                awayTeam: 'Roemenië',
                homeScore: null,
                awayScore: null,
                predictedHomeScore: 0,
                predictedAwayScore: 0,
            }, {
                id: '3',
                date: '12 juli 2019',
                homeTeam: 'Nederland',
                awayTeam: 'Roemenië',
                homeScore: null,
                awayScore: null,
                predictedHomeScore: 0,
                predictedAwayScore: 0,
            }, {
                id: '4',
                date: '12 juli 2019',
                homeTeam: 'Oostenrijk',
                awayTeam: 'Oekraïne',
                homeScore: null,
                awayScore: null,
                predictedHomeScore: 1,
                predictedAwayScore: 1,
            }, {
                id: '5',
                date: '12 juli 2019',
                homeTeam: 'Nederland',
                awayTeam: 'Oostenrijk',
                homeScore: null,
                awayScore: null,
                predictedHomeScore: 1,
                predictedAwayScore: 1,
            }, {
                id: '6',
                date: '12 juli 2019',
                homeTeam: 'Roemenië',
                awayTeam: 'Oekraïne',
                homeScore: null,
                awayScore: null,
                predictedHomeScore: 2,
                predictedAwayScore: 2,
            }]
        }, {
            pouleName: 'B',
            matches: [{
                id: '7',
                date: '12 juli 2019',
                homeTeam: 'Belgie',
                awayTeam: 'Rusland',
                homeScore: null,
                awayScore: null,
                predictedHomeScore: 0,
                predictedAwayScore: 0,
            }]
        }, {
            pouleName: 'C',
            matches: [{
                id: '7',
                date: '12 juli 2019',
                homeTeam: 'C1',
                awayTeam: 'C2',
                homeScore: null,
                awayScore: null,
                predictedHomeScore: 0,
                predictedAwayScore: 0,
            }]
        }, {
            pouleName: 'D',
            matches: [{
                id: '7',
                date: '12 juli 2019',
                homeTeam: 'D1',
                awayTeam: 'D2',
                homeScore: null,
                awayScore: null,
                predictedHomeScore: 0,
                predictedAwayScore: 0,
            }]
        }, {
            pouleName: 'E',
            matches: [{
                id: '7',
                date: '12 juli 2019',
                homeTeam: 'E1',
                awayTeam: 'E2',
                homeScore: null,
                awayScore: null,
                predictedHomeScore: null,
                predictedAwayScore: null,
            }]
        }, {
            pouleName: 'F',
            matches: [{
                id: '7',
                date: '12 juli 2019',
                homeTeam: 'F1',
                awayTeam: 'F2',
                homeScore: null,
                awayScore: null,
                predictedHomeScore: 0,
                predictedAwayScore: 0,
            }]
        }];
    }

    private punten(gescoord: number, tegen: number) {
        return gescoord === null || tegen === null ?
            0 : gescoord > tegen ?
                3 : gescoord < tegen ?
                    0 : 1;
    }
}
