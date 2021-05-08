import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UiService} from '../../services/ui.service';

@Component({
    selector: 'app-menu-toolbar',
    templateUrl: './menu-toolbar.component.html',
    styleUrls: ['./menu-toolbar.component.scss'],
})
export class MenuToolbarComponent implements OnInit {

    @Input() rightCornerIcon: string;
    @Output() emitIconClick = new EventEmitter<any>();

    constructor(public uiService: UiService) {
    }

    ngOnInit() {
    }

    iconClick(event$) {
        this.emitIconClick.emit(event$);
    }
}
