import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {IStandLine} from '../models/stand.model';

@Injectable({
    providedIn: 'root'
})
export class UiService {

    isDirty: BehaviorSubject<boolean> = new BehaviorSubject(false);
    totaalstand$: BehaviorSubject<IStandLine[]> = new BehaviorSubject([]);
    lastUpdated$: BehaviorSubject<{ lastUpdated?: number }> = new BehaviorSubject({});

    constructor() {
    }
}
