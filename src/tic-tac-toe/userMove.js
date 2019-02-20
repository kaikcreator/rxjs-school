import { canvas, CELL_SIZE } from './draw';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

//observable with user input
const click$ = fromEvent(canvas, 'click').pipe(
    map(val =>  { return {
        x: Math.floor(val.offsetX/CELL_SIZE), 
        y: Math.floor(val.offsetY/CELL_SIZE)
    }})
); 

//this observable return only user valid clicks
export const userMove$ = click$.pipe(
    map(click => state => {
        if(state.nextPlayer == 1 && state.board[click.y][click.x] == 0){
            return click;
        }
        return null;
    })
);