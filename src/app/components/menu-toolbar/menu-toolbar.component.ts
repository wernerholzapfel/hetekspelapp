import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-menu-toolbar',
  templateUrl: './menu-toolbar.component.html',
  styleUrls: ['./menu-toolbar.component.scss'],
})
export class MenuToolbarComponent implements OnInit {

  @Input() title: string;
  @Input() rightCornerIcon: string;
  @Output() emitIconClick = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  iconClick() {
    this.emitIconClick.emit();
  }
}
