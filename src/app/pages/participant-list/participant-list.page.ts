import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {StatsService} from '../../services/stats.service';
import {UiService} from '../../services/ui.service';
import {RouteStateService} from '../../services/route-state.service';

@Component({
    selector: 'app-participant-list',
    templateUrl: './participant-list.page.html',
    styleUrls: ['./participant-list.page.scss'],
})
export class ParticipantListPage implements OnInit, OnDestroy {

    constructor(private statsService: StatsService,
                private uiService: UiService,
                private routeStateService: RouteStateService) {
    }

    isAdmin$: Observable<boolean>;
    participants: {
        participant_displayName: string;
        matchpredictions: string;
        poulepredictions: string;
        knockoutpredictions: string;
    }[];
    matchesPredicted: number;
    poulePredicted: number;
    knockoutPredicted: number;


    ngOnInit() {
        this.routeStateService.setCurrentRouteComponent(this);
        this.getParticipants(null);
        this.isAdmin$ = this.uiService.isAdmin$;
    }

    getParticipants(event) {
        return this.statsService.getParticipantsStats().subscribe(participants => {
            this.participants = participants;
            this.matchesPredicted = this.participants.filter(p => p.matchpredictions === '36').length;
            this.poulePredicted = this.participants.filter(p => p.poulepredictions === '24').length;
            this.knockoutPredicted = this.participants.filter(p => p.knockoutpredictions === '15').length;
            if (event) {
                event.target.complete();
            }
        });
    }

    refresh(event) {
        console.log('refresh triggerd on participant list page');
        this.getParticipants(event);
    }

    ngOnDestroy(): void {
        this.routeStateService.setCurrentRouteComponent(null);
    }

}
