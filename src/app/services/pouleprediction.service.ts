import {Injectable} from '@angular/core';
import {IPoulePrediction} from '../models/participant.model';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PoulepredictionService {

    constructor(private http: HttpClient) {
    }

    savePoulePredictions(poulePredictions: IPoulePrediction[]): Observable<any> {
        return this.http.post<IPoulePrediction[]>(`${environment.apiBaseUrl}/poule-prediction`, poulePredictions);
    }


    getPoulePredictions(): Observable<any> {
        return this.http.get<any>(`${environment.apiBaseUrl}/poule-prediction`);
    }

    getPositionForThirdPlacedTeams(): any[] {
        return [
            {
                identifier: 'ABCD',
                WB: '3A',
                WC: '3D',
                WE: '3B',
                WF: '3C'
            }, {
                identifier: 'ABCE',
                WB: '3A',
                WC: '3E',
                WE: '3B',
                WF: '3C'
            }, {
                identifier: 'ABCF',
                WB: '3A',
                WC: '3F',
                WE: '3B',
                WF: '3C'
            }, {
                identifier: 'ABDE',
                WB: '3D',
                WC: '3E',
                WE: '3A',
                WF: '3B'
            }, {
                identifier: 'ABDF',
                WB: '3D',
                WC: '3F',
                WE: '3A',
                WF: '3B'
            }, {
                identifier: 'ABEF',
                WB: '3E',
                WC: '3F',
                WE: '3B',
                WF: '3A'
            }, {
                identifier: 'ACDE',
                WB: '3E',
                WC: '3D',
                WE: '3C',
                WF: '3A'
            }, {
                identifier: 'ACDF',
                WB: '3F',
                WC: '3D',
                WE: '3C',
                WF: '3A'
            }, {
                identifier: 'ACEF',
                WB: '3E',
                WC: '3F',
                WE: '3C',
                WF: '3A'
            }, {
                identifier: 'ADEF',
                WB: '3E',
                WC: '3F',
                WE: '3D',
                WF: '3A'
            }, {
                identifier: 'BCDE',
                WB: '3E',
                WC: '3D',
                WE: '3B',
                WF: '3C'
            }, {
                identifier: 'BCDF',
                WB: '3F',
                WC: '3D',
                WE: '3C',
                WF: '3B'
            }, {
                identifier: 'BCEF',
                WB: '3F',
                WC: '3E',
                WE: '3C',
                WF: '3B'
            }, {
                identifier: 'BDEF',
                WB: '3F',
                WC: '3E',
                WE: '3D',
                WF: '3B'
            }, {
                identifier: 'CDEF',
                WB: '3F',
                WC: '3E',
                WE: '3D',
                WF: '3C'
            }
        ];
    }
}
