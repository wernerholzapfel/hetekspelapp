import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IKnockout} from '../models/knockout.model';
import {environment} from '../../environments/environment';
import {IKnockoutPrediction} from '../models/knockout-predictions.model';

@Injectable({
    providedIn: 'root'
})
export class KnockoutPredictionsService {

    constructor(private http: HttpClient) {
    }

    getKnockoutForParticipant(participantId: string): Observable<IKnockoutPrediction[]> {
        return this.http.get<IKnockoutPrediction[]>(`${environment.apiBaseUrl}/knockout-prediction/${participantId}`);
    }
}
