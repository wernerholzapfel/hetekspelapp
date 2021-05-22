import {Component, OnInit} from '@angular/core';
import {ParticipantService} from '../../services/participant.service';
import {Observable} from 'rxjs';
import {IParticipant} from '../../models/participant.model';

@Component({
  selector: 'app-participant-list',
  templateUrl: './participant-list.page.html',
  styleUrls: ['./participant-list.page.scss'],
})
export class ParticipantListPage implements OnInit {

  constructor(private participantService: ParticipantService) {
  }

  participants$: Observable<IParticipant[]>;

  ngOnInit() {
    this.participants$ = this.participantService.getParticipants();
  }

}
