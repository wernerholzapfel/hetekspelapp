import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {IHetEKSpel} from '../models/hetekspel.model';

@Injectable({
  providedIn: 'root'
})
export class HetekspelService {

  constructor(private http: HttpClient) {
  }

  getHetEKSpel(): Observable<IHetEKSpel> {
    return this.http.get<IHetEKSpel>(`${environment.apiBaseUrl}/hetekspel/`);
  }
}
