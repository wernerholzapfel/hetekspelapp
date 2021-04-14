import {Component, OnDestroy, OnInit} from '@angular/core';
import {IHeadline} from '../../models/headline.model';
import {HeadlineService} from '../../services/headline.service';
import {Subject} from 'rxjs';
import {IonRouterOutlet, ModalController} from '@ionic/angular';
import {EditHeadlineComponent} from '../edit-headline/edit-headline.component';
import {UiService} from '../../services/ui.service';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-headline',
    templateUrl: './headline.component.html',
    styleUrls: ['./headline.component.scss'],
})
export class HeadlineComponent implements OnInit, OnDestroy {

    headline: IHeadline;
    headlineIndex = 0;
    headlines: IHeadline[];
    unsubscribe = new Subject<void>();
    isAdmin: boolean;

    constructor(private uiService: UiService,
                private headlineService: HeadlineService,
                private modalController: ModalController,
                private routerOutlet: IonRouterOutlet) {
    }

    ngOnInit() {
        this.uiService.isAdmin$.pipe(takeUntil(this.unsubscribe))
            .subscribe(admin => this.isAdmin = admin);

        this.headlineService.getHeadlines()
            .subscribe(headlines => {
                if (headlines && headlines.length > 0) {
                    this.headlines = headlines;
                    this.headline = headlines[this.headlineIndex];
                }
            });
    }

    nextHeadline() {
        this.headlineIndex++;
        this.headline = this.headlines[this.headlineIndex];

    }

    previousHeadline() {
        this.headlineIndex--;
        this.headline = this.headlines[this.headlineIndex];
    }

    addHeadline() {
        this.editHeadline({title: '', text: '', isActive: true}, true);
    }

    async editHeadline(headline: IHeadline, isNewHeadline: boolean) {
        const modal = await this.modalController.create({
            component: EditHeadlineComponent,
            swipeToClose: true,
            presentingElement: this.routerOutlet.nativeEl,
            componentProps: {
                headline,
            }
        });

        modal.onDidDismiss().then((event) => {
            if (event.data && isNewHeadline) {
                this.headlines.unshift(event.data);
                this.headline = event.data;
                this.headlineIndex = 0;
            }
        });

        return await modal.present();
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.unsubscribe();
    }
}
