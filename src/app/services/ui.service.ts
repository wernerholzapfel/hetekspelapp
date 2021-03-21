import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UiService {

    isDirty: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor() {
    }
}
