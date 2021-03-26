export interface IPoule {
    pouleName: string,
    matches: IMatch[]
}

export interface IMatch {
    id: string;
    date: string;
    poule: string;
    city: string;
    homeTeam: ITeam;
    awayTeam: ITeam;
    homeScore: number;
    awayScore: number;
}

export class UpdateMatchDto {
    id: string;
    homeScore: number;
    awayScore: number;

}

export interface ITeam {
    id: string,
    name?: string,
    logoUrl?: string,
}

export class UpdateTeamPositionDto {
    id: string;
    poulePosition: number;
}

export interface ITable {
    // pouleName: string;
    tableLines: ITableLine[]
}

export interface ITableLine {
    team: ITeam;
    positie: number;
    gespeeld: number;
    winst: number;
    punten: number;
    goalsFor: number;
    goalsAgainst: number;
    sortering: number;
    thirdPositionScore?: number;
    spelpunten?: number;
}
