import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class StandService {

    constructor(private http: HttpClient) {
    }

    createStand(): Observable<any[]> {
        return this.http.post<any[]>(`${environment.apiBaseUrl}/stand`, {});
    }

    calculatePosition(stand: any[]) {
        let previousPosition = 1;
        return stand.map((participant, index) => {
            if (index > 0 && participant && participant.totalPoints === stand[index - 1].totalPoints) {
                return {
                    ...participant,
                    position: previousPosition,
                };
            } else {
                previousPosition = index + 1;
                return {
                    ...participant,
                    position: index + 1,
                };
            }
        });
    }
}
