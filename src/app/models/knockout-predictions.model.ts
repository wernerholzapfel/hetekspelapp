import {ITeam} from './poule.model';

export interface ISaveKnockoutPredictionsBody {
    id?: string;
    selectedTeam: ITeam;
    knockout?: { id: string }
}
