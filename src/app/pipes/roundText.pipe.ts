import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'roundText'
})
export class RoundTextPipe implements PipeTransform {

    constructor() {
    }

    transform(value: unknown, ...args: unknown[]): unknown {
        switch (value) {
            case '16':
                return 'Achtste finales';
            case '8':
                return 'Kwartfinales';
            case '4':
                return 'Halve Finales';
            case '2':
                return 'Finale';
            default:
                return 'Winnaar';
        }
    }

}
