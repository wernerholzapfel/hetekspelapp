import { Component, OnInit } from '@angular/core';
import {StandService} from '../../../services/stand.service';
import {ToastService} from '../../../services/toast.service';

@Component({
  selector: 'app-stand',
  templateUrl: './stand.page.html',
  styleUrls: ['./stand.page.scss'],
})
export class StandPage implements OnInit {

  constructor(private standService: StandService,
              private toastService: ToastService) { }

  ngOnInit() {
  }

  berekenStand() {
    this.standService.createStand().subscribe(stand => {
      this.toastService.presentToast('stand bijgewerkt');
    });
  }
}
