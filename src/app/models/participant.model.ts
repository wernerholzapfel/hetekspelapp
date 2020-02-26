import {IMatch} from './poule.model';

export interface IParticipant {
  id?: string;
  displayName: string;
  teamName: string;
  email?: string;
}

export interface IMatchPrediction {
  id?: string;
  homeScore: number;
  awayScore: number;
  punten?: number;
  match: IMatch;
}

interface Id {
  id: string
}
