import {Component, OnDestroy, OnInit} from '@angular/core';
import {StandService} from '../../services/stand.service';
import {Router} from '@angular/router';
import {UiService} from '../../services/ui.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {IStandLine} from '../../models/stand.model';

@Component({
    selector: 'app-stand',
    templateUrl: './stand.page.html',
    styleUrls: ['./stand.page.scss'],
})
export class StandPage implements OnInit, OnDestroy {

    stand: IStandLine[];
    unsubscribe = new Subject<void>();

    constructor(private uiService: UiService,
                private router: Router) {
    }

    ngOnInit() {
        this.uiService.totaalstand$
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(stand => {
                    this.stand = stand;
                }
            )
    }

    navigateToParticipant(participantId) {
        this.router.navigate([`deelnemer/deelnemer/${participantId}/matches/`]);

    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.unsubscribe();
    }
}
