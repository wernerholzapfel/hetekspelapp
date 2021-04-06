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
}
