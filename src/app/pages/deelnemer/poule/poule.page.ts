import {Component, OnDestroy, OnInit} from '@angular/core';
import {IStandLine} from '../../../models/stand.model';
import {Subject} from 'rxjs';
import {UiService} from '../../../services/ui.service';
import {ActivatedRoute} from '@angular/router';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-poule',
  templateUrl: './poule.page.html',
  styleUrls: ['./poule.page.scss'],
})
export class PoulePage implements OnInit, OnDestroy {

  standLine: IStandLine
  unsubscribe = new Subject<void>();

  constructor(private uiService: UiService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.uiService.totaalstand$
        .pipe(takeUntil(this.unsubscribe))
        .subscribe(s => {
          this.standLine = s.find(line => line.id === this.route.snapshot.parent.parent.params.id);
        });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.unsubscribe();
  }

}
