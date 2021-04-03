import {Component, OnDestroy, OnInit} from '@angular/core';
import {IStandLine} from '../../../models/stand.model';
import {Subject} from 'rxjs';
import {UiService} from '../../../services/ui.service';
import {ActivatedRoute} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {PoulepredictionService} from '../../../services/pouleprediction.service';
import {IPoulePrediction} from '../../../models/participant.model';

@Component({
  selector: 'app-poule',
  templateUrl: './poule.page.html',
  styleUrls: ['./poule.page.scss'],
})
export class PoulePage implements OnInit, OnDestroy {

  standLine: IStandLine
  poules = [];
  unsubscribe = new Subject<void>();

  constructor(private uiService: UiService,
              private route: ActivatedRoute,
              private poulepredictionService: PoulepredictionService) { }

  ngOnInit() {
    this.uiService.totaalstand$
        .pipe(takeUntil(this.unsubscribe))
        .subscribe(s => {
          this.standLine = s.find(line => line.id === this.route.snapshot.parent.parent.params.id);
        });

    this.poulepredictionService.getPoulePredictionsByParticipant(this.route.snapshot.parent.parent.params.id).subscribe(
        poulePrediction => {
          this.poules = [{
            poule: 'A', stand: poulePrediction.filter(p => p.poule === 'A')
                .sort((a, b) => a.positie - b.positie),
            isSortDisabled: true
          },
            {
              poule: 'B', stand: poulePrediction.filter(p => p.poule === 'B')
                  .sort((a, b) => a.positie - b.positie),
              isSortDisabled: true
            },
            {
              poule: 'C', stand: poulePrediction.filter(p => p.poule === 'C')
                  .sort((a, b) => a.positie - b.positie),
              isSortDisabled: true
            },
            {
              poule: 'D', stand: poulePrediction.filter(p => p.poule === 'D')
                  .sort((a, b) => a.positie - b.positie),
              isSortDisabled: true
            },
            {
              poule: 'E', stand: poulePrediction.filter(p => p.poule === 'E')
                  .sort((a, b) => a.positie - b.positie),
              isSortDisabled: true
            },
            {
              poule: 'F', stand: poulePrediction.filter(p => p.poule === 'F')
                  .sort((a, b) => a.positie - b.positie),
              isSortDisabled: true
            }];
        });

  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.unsubscribe();
  }

}
