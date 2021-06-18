import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UiService} from '../../services/ui.service';
import {BehaviorSubject, combineLatest, Subject} from 'rxjs';
import {map, switchMap, takeUntil} from 'rxjs/operators';
import {IStandLine} from '../../models/stand.model';
import {StandService} from '../../services/stand.service';

@Component({
    selector: 'app-stand',
    templateUrl: './stand.page.html',
    styleUrls: ['./stand.page.scss'],
})
export class StandPage implements OnInit, OnDestroy {

    searchTerm$: BehaviorSubject<string> = new BehaviorSubject('');

    stand: IStandLine[];
    typeOfStand = 'totaal';
    unsubscribe: Subject<void>;

    constructor(public uiService: UiService,
                private standService: StandService,
                private router: Router) {
    }

    ngOnInit() {
        this.unsubscribe = new Subject<void>();

        this.uiService.isMatchStandActive$.pipe(switchMap(isMatchStandActive => {
            return combineLatest([
                this.uiService.totaalstand$.pipe(map(stand =>
                    this.standService.calculatePosition(stand.sort((a, b) => {
                        return isMatchStandActive ? b.matchPoints - a.matchPoints : b.totalPoints - a.totalPoints;
                    }))
                )),
                this.searchTerm$]);
        })).pipe(takeUntil(this.unsubscribe))
            .subscribe(([stand, searchTerm]) => {
                this.stand = this.uiService.filterDeelnemers(searchTerm, stand);
            });
    }

    search($event) {
        this.searchTerm$.next($event.detail.value);
    }

    setMatchStandActive(event) {
        this.uiService.isMatchStandActive$.next(event.detail.value === 'wedstrijden');
    }

    navigateToParticipant(participantId) {
        this.router.navigate([`deelnemer/deelnemer/${participantId}/matches/`], {replaceUrl: true});
    }

    openMatches(participantId) {
        this.router.navigate([`deelnemer/deelnemer/${participantId}/matches/`], {replaceUrl: true});
    }

    openPoules(participantId) {
        this.router.navigate([`deelnemer/deelnemer/${participantId}/poule/`], {replaceUrl: true});
    }

    openKnockout(participantId) {
        this.router.navigate([`deelnemer/deelnemer/${participantId}/knockout/`], {replaceUrl: true});
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.unsubscribe();
    }
}
