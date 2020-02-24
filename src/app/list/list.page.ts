import {Component, OnInit} from '@angular/core';
import {IPoule} from '../poule.model';
import {VoorspellingHelperService} from '../services/voorspelling-helper.service';

@Component({
    selector: 'app-list',
    templateUrl: 'list.page.html',
    styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
    public pouleName: string = 'A';
    isRegistrationOpen = true;
    pouleForm: IPoule;

    constructor(private voorspellingHelper: VoorspellingHelperService) {
    }

    selectPoule($event) {
        this.pouleName = $event.detail.value;
        this.pouleForm = this.voorspellingHelper.getPoules().find(p => p.pouleName === this.pouleName);
        this.voorspellingHelper.berekenStand(this.pouleForm.matches);
    }

    ngOnInit() {
        this.pouleForm = this.voorspellingHelper.getPoules().find(p => p.pouleName === this.pouleName);
        this.voorspellingHelper.berekenStand(this.pouleForm.matches);
    }

    toggle() {
        this.isRegistrationOpen = !this.isRegistrationOpen;
        console.log(this.pouleForm);
    }

    // add back when alpha.4 is out
    // navigate(item) {
    //   this.router.navigate(['/list', JSON.stringify(item)]);
    // }

}
