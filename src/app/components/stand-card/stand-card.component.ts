import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {VoorspellingHelperService} from '../../services/voorspelling-helper.service';
import {IonReorderGroup} from '@ionic/angular';
import {PoulepredictionService} from '../../services/pouleprediction.service';
import {UiService} from '../../services/ui.service';
import {TeamService} from '../../services/team.service';

@Component({
    selector: 'app-stand-card',
    templateUrl: './stand-card.component.html',
    styleUrls: ['./stand-card.component.scss'],
})
export class StandCardComponent implements OnInit {
    @ViewChild(IonReorderGroup, {static: true}) reorderGroup: IonReorderGroup;

    constructor(private voorspellingHelper: VoorspellingHelperService,
                private poulepredictionService: PoulepredictionService,
                private teamService: TeamService,
                public uiService: UiService) {
    }

    @Input() poule: { poule: string, stand: any[], isSortDisabled: boolean };
    @Input() admin = false;
    @Input() editMode = true;

    ngOnInit() {
        console.log(this.poule.stand);
    }

    doReorder(ev: any) {
        // Before complete is called with the items they will remain in the
        // order before the drag
        console.log('Before complete', this.poule.stand);

        // Finish the reorder and position the item in the DOM based on
        // where the gesture ended. Update the items variable to the
        // new order of items
        this.poule.stand = ev.detail.complete(this.poule.stand).map((line, index) => {
            return {
                ...line,
                positie: index + 1
            };
        });

        this.uiService.isDirty$.next(true)
        // After complete is called the items will be in the new order
        // console.log('After complete', this.poule.stand);
    }

    toggleReorderGroup() {
        this.poule.isSortDisabled = !this.poule.isSortDisabled;
    }

    save() {
        this.teamService.updateTeam(this.poule.stand.map(line => {
            return {
                id: line.team.id,
                poulePosition: line.positie
            }
        })).subscribe(response => {
            console.log(response);
        });
    }
}
