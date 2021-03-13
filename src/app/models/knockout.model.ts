import {ITeam} from './poule.model';
import {ISaveKnockoutPredictionsBody} from './knockout-predictions.model';

export interface IKnockout {
  id: string;
  matchId: string;
  homeId: string;
  awayId: string;
  round: string;
  city: string;
  selectedTeam?: ITeam;
  homeTeam?: ITeam;
  awayTeam?: ITeam;
  homeScore?: ITeam;
  awayScore?: ITeam;
  prediction: ISaveKnockoutPredictionsBody; // todo prediction get body?
}
