import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UiService} from '../../services/ui.service';
import {BehaviorSubject, combineLatest, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {IStandLine} from '../../models/stand.model';

@Component({
    selector: 'app-stand',
    templateUrl: './stand.page.html',
    styleUrls: ['./stand.page.scss'],
})
export class StandPage implements OnInit, OnDestroy {

    searchTerm$: BehaviorSubject<string> = new BehaviorSubject('');

    stand: IStandLine[];
    unsubscribe = new Subject<void>();

    constructor(private uiService: UiService,
                private router: Router) {
    }

    ngOnInit() {
        combineLatest([
            this.uiService.totaalstand$,
            this.searchTerm$])
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(([stand, searchTerm]) => {
                    this.stand = this.uiService.filterDeelnemers(searchTerm, stand);
                }
            );
    }

    search($event) {
        this.searchTerm$.next($event.detail.value);
    }

    navigateToParticipant(participantId) {
        this.router.navigate([`deelnemer/deelnemer/${participantId}/matches/`]);
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.unsubscribe();
    }
}
