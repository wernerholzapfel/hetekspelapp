import {IMatch, ITableLine} from './poule.model';
import {IStandLine} from './stand.model';

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
  spelpunten?: number;
  match?: IMatch;
  participant?: IParticipant;
  tableLine?: IStandLine;
}

export interface IPoulePrediction {
  id?: string;
  poule: string;
  position: number;
  thirdPositionScore: number;
}
