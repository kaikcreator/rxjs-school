import { BehaviorSubject } from 'rxjs';

//proxy subject needed to break cicrcular dependency.
export const gameState$ = new BehaviorSubject({
    board: Array(3).fill().map(() => Array(3).fill(0)),
    nextPlayer: 1 //1 is user, 2 is computer
});