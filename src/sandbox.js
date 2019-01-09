import { displayLog } from './utils';
import { fromEvent } from 'rxjs';
import { map, takeWhile, tap, scan } from 'rxjs/operators';

export default () => {
    /** start coding */
    const grid = document.getElementById('grid');
    const click$ = fromEvent(grid, 'click').pipe(
        map(val => [ 
            Math.floor(val.offsetX/50), 
            Math.floor(val.offsetY/50)
        ]),
        takeWhile( ([col, row]) => col != 0 ),
        tap(val => console.log(`cell: [${val}]`)),
        scan((accumulated, current) => {
            return {
                clicks: accumulated.clicks + 1,
                cells: [...accumulated.cells, current]
            }
        }, {clicks:0, cells:[]}),
    );

    const subscription = click$.subscribe(data => displayLog(`${data.clicks} clicks: ${JSON.stringify(data.cells)}`));

    /** end coding */
}