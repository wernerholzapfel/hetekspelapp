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
  spelpunten?: number;
  match: IMatch;
}

export interface IPoulePrediction {
  id?: string;
  poule: string;
  position: number;
  thirdPositionScore: number;
}
