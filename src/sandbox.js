import { updateDisplay, displayLog } from './utils';
import { api } from './api';
import { fromEvent, from } from 'rxjs';
import { map, scan, tap, mergeMap, concatMap } from 'rxjs/operators';

export default () => {
    /** start coding */
    
    const button = document.getElementById('btn');

    /** get comments on button click */
    fromEvent(button, 'click').pipe(
        scan((acc, evt) => acc + 1, 0),            
        concatMap(page => api.getCommentsList(page)),
        mergeMap(comments => from(comments)),
        map(JSON.stringify),
        tap(console.log),
    ).subscribe(displayLog);

    /** end coding */
}