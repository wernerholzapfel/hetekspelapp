import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {IStandLine} from '../models/stand.model';
import {IParticipant} from '../models/participant.model';

@Injectable({
    providedIn: 'root'
})
export class UiService {

    isDirty: BehaviorSubject<boolean> = new BehaviorSubject(false);
    participant$: BehaviorSubject<IParticipant> = new BehaviorSubject(null);
    isAdmin$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    totaalstand$: BehaviorSubject<IStandLine[]> = new BehaviorSubject([]);
    lastUpdated$: BehaviorSubject<{ lastUpdated?: number }> = new BehaviorSubject({});

    constructor() {
    }
}
