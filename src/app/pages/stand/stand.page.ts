import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UiService} from '../../services/ui.service';
import {BehaviorSubject, combineLatest, Subject} from 'rxjs';
import {map, switchMap, takeUntil} from 'rxjs/operators';
import {IStandLine} from '../../models/stand.model';
import {StandService} from '../../services/stand.service';
import {PopoverController} from '@ionic/angular';
import {ToggleStandListComponent} from '../../components/toggle-stand-list/toggle-stand-list.component';

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
                private standService: StandService,
                private router: Router,
                private popoverController: PopoverController) {
    }

    ngOnInit() {
        this.uiService.isMatchStandActive$.pipe(switchMap(isMatchStandActive => {
            return combineLatest([
                this.uiService.totaalstand$.pipe(map(stand =>
                    this.standService.calculatePosition(stand.sort((a, b) => {
                        return isMatchStandActive ? b.matchPoints - a.matchPoints : b.totalPoints - a.totalPoints;
                    }))
                )),
                this.searchTerm$])
                .pipe(takeUntil(this.unsubscribe));
        }))
            .subscribe(([stand, searchTerm]) => {
                this.stand = this.uiService.filterDeelnemers(searchTerm, stand);
            });
    }

    search($event) {
        this.searchTerm$.next($event.detail.value);
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

    async toggleMatchStand(ev: any) {
        const popover = await this.popoverController.create({
            component: ToggleStandListComponent,
            // data: {
            //     isMatchStandActive: this.isMatchStandActive$.getValue()
            // },
            event: ev,
            translucent: true
        });
        await popover.present();

        await popover.onDidDismiss().then(response => {
            if (response.data) {
                this.uiService.isMatchStandActive$.next(response.data.isMatchStandActive);
            }
        });
    }
}
