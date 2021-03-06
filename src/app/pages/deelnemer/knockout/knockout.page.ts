import {Component, OnDestroy, OnInit} from '@angular/core';
import {KnockoutPredictionsService} from '../../../services/knockout-predictions.service';
import {KnockoutService} from '../../../services/knockout.service';
import {combineLatest, Subject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {UiService} from '../../../services/ui.service';
import {IStandLine} from '../../../models/stand.model';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-knockout',
    templateUrl: './knockout.page.html',
    styleUrls: ['./knockout.page.scss'],
})
export class KnockoutPage implements OnInit, OnDestroy {

    predictions: any[]; // todo model
    speelschema: any[]; // todo model
    standLine: IStandLine;
    europeesKampioen: any;
    unsubscribe = new Subject<void>();

    constructor(private knockoutPredictionService: KnockoutPredictionsService,
                private knockoutService: KnockoutService,
                private uiService: UiService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        combineLatest([
            this.knockoutPredictionService.getKnockoutForParticipant(this.route.snapshot.parent.parent.params.id),
            this.knockoutService.getOriginalSpeelschema()])
            .subscribe(([results, speelschema]) => {
                this.speelschema = speelschema;
                this.predictions = results.map(prediction => {
                    if (prediction.knockout.round === '2') {
                        this.setEuropeesKampioen(prediction);
                    }
                    return {
                        ...prediction,
                        homeInRound: !!speelschema.find(schema => {
                            return schema.round === prediction.knockout.round &&
                                (schema.homeTeam && prediction.homeTeam.id === schema.homeTeam.id ||
                                    schema.awayTeam && prediction.homeTeam.id === schema.awayTeam.id);
                        }),
                        awayInRound: !!speelschema.find(schema => {
                            return schema.round === prediction.knockout.round &&
                                (schema.homeTeam && prediction.awayTeam.id === schema.homeTeam.id ||
                                    schema.awayTeam && prediction.awayTeam.id === schema.awayTeam.id);
                        }),
                    };
                });
            });

        this.uiService.totaalstand$
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(s => {
                this.standLine = s.find(line => line.id === this.route.snapshot.parent.parent.params.id);
            });
    }

    setEuropeesKampioen(finaleWedstrijd: any) {
        this.europeesKampioen = {
            team: finaleWedstrijd.selectedTeam,
            winnerSpelpunten: finaleWedstrijd.winnerSpelpunten
        };
    }

    openKoTeam(team, round) {
        this.router.navigate([`stats/knockout/round/${round}/team/${team}`], {replaceUrl: true});
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.unsubscribe();
    }
}
