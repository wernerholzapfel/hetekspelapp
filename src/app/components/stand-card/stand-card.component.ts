import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {IPoule, ITableLine} from '../../poule.model';
import {VoorspellingHelperService} from '../../services/voorspelling-helper.service';
import { IonReorderGroup } from '@ionic/angular';

@Component({
    selector: 'app-stand-card',
    templateUrl: './stand-card.component.html',
    styleUrls: ['./stand-card.component.scss'],
})
export class StandCardComponent implements OnInit {
    @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;

    constructor(private voorspellingHelper: VoorspellingHelperService) {
    }

    @Input() pouleName: string;
    @Input() pouleForm: IPoule;
    public stand: ITableLine[];

    ngOnInit() {
        if (this.pouleForm) {
            this.voorspellingHelper.standen$.pipe().subscribe(standen => {
                if (standen.length > 0) {
                    this.stand = standen[0].tableLines;
                    // todo
                    // this.stand = standen.find(stand => stand.pouleName === this.pouleName).tableLines;
                }
            });
        }
    }

    doReorder(ev: any) {
        // Before complete is called with the items they will remain in the
        // order before the drag
        console.log('Before complete', this.stand);

        // Finish the reorder and position the item in the DOM based on
        // where the gesture ended. Update the items variable to the
        // new order of items
        this.stand = ev.detail.complete(this.stand);

        // After complete is called the items will be in the new order
        console.log('After complete', this.stand);
    }
}
