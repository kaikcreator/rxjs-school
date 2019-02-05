import { BehaviorSubject } from 'rxjs';

export const gameState$ = new BehaviorSubject({
    board: Array(3).fill().map(() => Array(3).fill(0)),
    nextPlayer: 1,
    finished: false,
    winner: null
});