import { displayLog } from './utils';
import { fromEvent, interval } from 'rxjs';
import { map, /*first, take,*/ takeWhile, mapTo, startWith, switchMap } from 'rxjs/operators';

export default () => {
    /** start coding */
    const grid = document.getElementById('grid');
    const gridSize = 3;
    const cellWidth = 50;

    //empty grid
    const gameState = {
        board: Array(gridSize).fill().map(() => Array(gridSize).fill(0)),
        nextPlayer: 1 //1 or 2
    }

    //user selection
    const click$ = fromEvent(grid, 'click').pipe(
        map(val =>  { return {
            nextPlayer: 'user',
            col: Math.floor(val.offsetX/cellWidth), 
            row: Math.floor(val.offsetY/cellWidth)
        }})
    );

    //computer selection
    const computer$ = interval(1000).pipe(
        //return random cell
        map( val => [Math.floor(Math.random()*3)][Math.floor(Math.random()*3)] )
    )

    //
    const game$ = merge(reducer1, reducer2, ...).pipe(
        startWith(gameState),
        switchMap(({nextPlayer}) => nextPlayer == 1 ? click$ : computer$),
        scan((acc/* acc is the state */,reducer) => reducer(acc))
    )

    const subscription = click$.subscribe(data => displayLog(data));

    /** end coding */
}