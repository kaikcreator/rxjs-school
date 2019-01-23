import { updateDisplay, displayLog } from './utils';
import { fromEvent } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';

export default () => {
    /** start coding */
    
    const inputBox = document.getElementById('input-box');

    const inputSrc$ = fromEvent(inputBox, "input").pipe(
        debounceTime(300),
        map(event => event.target.value)
    );

    inputSrc$.subscribe(displayLog);

    /** end coding */
}