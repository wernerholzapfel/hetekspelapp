export interface IPoule {
    pouleName: string,
    matches: IMatch[]
}

export interface IMatch {
    id: string;
    date: string;
    homeTeam: string;
    awayTeam: string;
    homeScore: number;
    awayScore: number;
    predictedHomeScore: number;
    predictedAwayScore: number;
}

export interface ITable {
    // pouleName: string;
    tableLines: ITableLine[]
}

export interface ITableLine {
    id: string;
    positie: number;
    gespeeld: number;
    punten:number;
    goalsFor: number;
    goalsAgainst: number;
    sortering: number;
}
