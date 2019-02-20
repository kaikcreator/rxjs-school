import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { getEmptyCells } from './game';

//this observable return only computer valid clicks
export const computerTurn$ = new Subject();  
export const computerMove$ = computerTurn$.asObservable().pipe(
     map(() => state => {
        const validCells = getEmptyCells(state.board);
        const randomCell = Math.floor(Math.random() * validCells.length);
        return validCells[randomCell];
     } )
);
