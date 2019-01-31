import { updateDisplay, displayLog } from './utils';
import { api } from './api';
import { fromEvent, of, empty } from 'rxjs';
import { map, scan, tap, concatMap, catchError, retry } from 'rxjs/operators';

export default () => {
    /** start coding */
    
    const button = document.getElementById('btn');

    /** get comments on button click */
    fromEvent(button, 'click').pipe(
        scan((acc, evt) => acc + 1, 0),            
        concatMap(id => api.getComment(id).pipe(
            retry(3),
            //catchError((err, src$) => { console.log("catch!"); return src$; })
            )),
        map(JSON.stringify),
        tap(console.log),
    ).subscribe(displayLog, err => {console.log("Error detected - ", err.message)});

    /** end coding */
}