import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {IStandLine} from '../models/stand.model';
import {IParticipant} from '../models/participant.model';

@Injectable({
    providedIn: 'root'
})
export class UiService {

    isRegistrationOpen$: BehaviorSubject<boolean> = new BehaviorSubject(true);
    isDirty$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    participant$: BehaviorSubject<IParticipant> = new BehaviorSubject(null);
    isAdmin$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    totaalstand$: BehaviorSubject<IStandLine[]> = new BehaviorSubject([]);
    lastUpdated$: BehaviorSubject<{ lastUpdated?: number }> = new BehaviorSubject({});

    constructor() {
    }

     filterDeelnemers(searchTerm: string, deelnemers: any[]): any[] {
         if ((searchTerm === undefined || searchTerm.length < 2)) {
             return deelnemers;
         } else {
             searchTerm = searchTerm.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
             return deelnemers.filter(deelnemer => {
                 const searchableWords: string[] = (deelnemer.displayName)
                     .toLowerCase()
                     .normalize('NFD')
                     .replace(/[\u0300-\u036f]/g, '')
                     .split(' ');

                return (!searchTerm || searchTerm
                    .trim()
                    .split(' ')
                    .map(word => word)
                    .filter(searchWord => {
                        return searchableWords.filter(searchableWord => {
                            return searchableWord.indexOf(searchWord.trim()) > -1;
                        }).length > 0;
                    }).length > 0);
            });
        }
    }
}
