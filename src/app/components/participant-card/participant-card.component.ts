import {Component, Input, OnInit} from '@angular/core';
import {IStandLine} from '../../models/stand.model';
import {Router} from '@angular/router';

@Component({
    selector: 'app-participant-card',
    templateUrl: './participant-card.component.html',
    styleUrls: ['./participant-card.component.scss'],
})
export class ParticipantCardComponent implements OnInit {

    @Input() standLine: IStandLine;
    @Input() lastUpdated: number;
    @Input() color = 'primary';

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    openStand() {
        this.router.navigate(['stand'], {replaceUrl: true});
    }

    openMatches() {
        this.router.navigate([`deelnemer/deelnemer/${this.standLine.id}/matches/`], {replaceUrl: true});
    }

    openPoules() {
        this.router.navigate([`deelnemer/deelnemer/${this.standLine.id}/poule/`], {replaceUrl: true});
    }

    openKnockout() {
        this.router.navigate([`deelnemer/deelnemer/${this.standLine.id}/knockout/`], {replaceUrl: true});
    }

}
