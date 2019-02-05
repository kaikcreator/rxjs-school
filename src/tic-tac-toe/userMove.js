import { canvas, CELL_SIZE } from './draw';
import { fromEvent } from 'rxjs';
import { map, withLatestFrom, filter } from 'rxjs/operators';
import { gameState$ } from './gameState';

//observable with user input
const click$ = fromEvent(canvas, 'click').pipe(
    map(val =>  { return {
        x: Math.floor(val.offsetX/CELL_SIZE), 
        y: Math.floor(val.offsetY/CELL_SIZE)
    }})
); 

//this observable return only user valid clicks
export const userMove$ = click$.pipe(
    withLatestFrom(gameState$),
    //allow only clicks when it is the user turn
    filter(([click, state]) => state.nextPlayer == 1),
    //check that it is a valid move
    filter(([click, state]) => state.board[click.y][click.x] == 0),
    //return only the click value
    map(([click, state]) => click),   
);