import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {KnockoutPredictionsService} from '../../../../../services/knockout-predictions.service';
import {IParticipant} from '../../../../../models/participant.model';
import {ITeamKnockout} from '../../../../../models/poule.model';
import {combineLatest, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {UiService} from '../../../../../services/ui.service';

@Component({
    selector: 'app-knockout-participants',
    templateUrl: './knockout-participants.page.html',
    styleUrls: ['./knockout-participants.page.scss'],
})
export class KnockoutParticipantsPage implements OnInit, OnDestroy {

    constructor(private route: ActivatedRoute,
                private router: Router,
                private knockoutPredictionService: KnockoutPredictionsService,
                private uiService: UiService
    ) {
    }

    koTeamStats: { team: ITeamKnockout, participants: { participant: IParticipant, tableLine: any }[], round: string };
    unsubscribe = new Subject<void>();

    ngOnInit() {
        combineLatest([
            this.uiService.totaalstand$,
            this.knockoutPredictionService.getParticipantForKnockoutTeamInRound(
                this.route.snapshot.params.roundid, this.route.snapshot.params.teamid)])
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(([stand, koTeamStats]) => {
                if (stand.length > 0) {
                    this.koTeamStats = {
                        ...koTeamStats,
                        participants: koTeamStats.participants.map(p => {
                            return {
                                ...p,
                                tableLine: stand.find(line => line.id === p.participant.id)
                            };
                        }).sort((a, b) => a.tableLine.position - b.tableLine.position)
                    };
                }
            });
    }

    openParticipant(participantId: string) {
        this.router.navigate([`deelnemer/deelnemer/${participantId}/knockout/`]);

    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.unsubscribe();
    }

}
