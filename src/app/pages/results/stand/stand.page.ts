import {Component, OnInit} from '@angular/core';
import {StandService} from '../../../services/stand.service';
import {ToastService} from '../../../services/toast.service';
import {NotificationService} from '../../../services/notification.service';

@Component({
    selector: 'app-stand',
    templateUrl: './stand.page.html',
    styleUrls: ['./stand.page.scss'],
})
export class StandPage implements OnInit {

    constructor(private standService: StandService,
                private notificationService: NotificationService,
                private toastService: ToastService) {
    }

    ngOnInit() {
    }

    berekenStand() {
        this.standService.createStand().subscribe(stand => {
            this.toastService.presentToast('stand bijgewerkt');
        });
    }

    sendNotification() {
        console.log('ik zit in de sendnotification');
        this.notificationService.sendNotification().subscribe(() => {
            console.log('ik zit in de subscribe');
            this.toastService.presentToast('notificatie vestuurd');
        });
    }
}
