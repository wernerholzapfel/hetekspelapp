import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IMatchPrediction, IParticipant} from '../models/participant.model';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {IMatch} from '../models/poule.model';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private http: HttpClient) {
  }

  getMatches(): Observable<IMatch[]> {
    return this.http.get<IMatch[]>(`${environment.apiBaseUrl}/match`)
        .pipe(map(res => res as IMatch[]));
  }

  getMatchPredictions(): Observable<IMatchPrediction[]> {
    return this.http.get<IMatchPrediction[]>(`${environment.apiBaseUrl}/match-prediction`)
        .pipe(map(res => res as IMatchPrediction[]));
  }

  saveMatchPredictions(matchPredictions: IMatchPrediction[]): Observable<any> {
    return this.http.post<IMatchPrediction[]>(`${environment.apiBaseUrl}/match-prediction`, matchPredictions);
  }
}