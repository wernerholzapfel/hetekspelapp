import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-menu-toolbar',
  templateUrl: './menu-toolbar.component.html',
  styleUrls: ['./menu-toolbar.component.scss'],
})
export class MenuToolbarComponent implements OnInit {

  @Input() title: string;
  constructor() { }

  ngOnInit() {}

}
