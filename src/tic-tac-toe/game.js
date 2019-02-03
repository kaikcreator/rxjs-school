import { gameState$ } from './gameState';
import { userMove$ } from './userMove';
import { simulateComputerTurn, computerMove$} from './computerMove';
import { combineLatest } from 'rxjs';
import { tap, scan } from 'rxjs/operators';

//pure function to find out empty cells
export const getEmptyCells = (board) =>{
    const emptyCells = [];
    //detect empty cells
    for(let x = 0; x < board.length; x++){
        for(let y=0; y < board[0].length; y++){
            if(board[y][x] == 0){
                emptyCells.push({x, y})
            }
        }
    };
    return emptyCells;        
}
    
//pure method to update the game state based on current click
const updateGameState = (gameState, playersClick) =>{
    let updatedBoard = [...gameState.board];
    //get move from expected player
    const move = playersClick[gameState.nextPlayer - 1];
    //update board with new move
    updatedBoard[move.y][move.x] = gameState.nextPlayer;
    //find out empty cells
    const haveEmptyCells = getEmptyCells(updatedBoard).length == 0 ? false : true;
    //return game state with updated board and updated nextPlayer
    return {
        board: updatedBoard,
        nextPlayer: gameState.nextPlayer == 1 ? 2 : 1,
        finished: !haveEmptyCells
    };
}


//main observable with the game logic.
export const game$ = combineLatest(userMove$, computerMove$).pipe(
    //the initial sample makes scan to init game
    tap( ([user, computer]) => console.log("u: ", user, " - c:", computer) ),
    //update gameState (board and turn)
    scan( updateGameState, gameState$.value ),
    //propagate updated game state with proxy subject, so userClick can use newest state 
    tap( state => gameState$.next(state) ),
    //check if game is finished, and therefore complete observable(with win/lose state)
    tap(state => {if(state.finished){
        console.log("FINISHED");
        gameState$.complete();
    }}),
    tap(({board}) => console.log(board)),
    //if the move was coming from user, then schedule computer click
    tap((state) => {
        if(state.nextPlayer == 2){
            simulateComputerTurn(getEmptyCells(state.board))
        }
    })
);