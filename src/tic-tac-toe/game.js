import { gameState$ } from './gameState';
import { userMove$ } from './userMove';
import { simulateComputerTurn, computerMove$} from './computerMove';
import { combineLatest } from 'rxjs';
import { tap, scan, takeWhile } from 'rxjs/operators';

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
    let finished = !haveEmptyCells;
    const winner = findOutWinner(updatedBoard);
    if(winner){
        finished = true;
    }
    //return game state with updated board and updated nextPlayer
    return {
        board: updatedBoard,
        nextPlayer: gameState.nextPlayer == 1 ? 2 : 1,
        finished: finished,
        winner: winner
    };
}

const findOutWinner = board =>{
    //check rows and cols
    for (let i=0;i<3;i++){
        if( (board[i][0] && board[i][0] == board[i][1] && board[i][1] == board[i][2]) ){
            return board[i][0];
        }
        else if ( (board[0][i] && board[0][i] == board[1][i] && board[1][i] == board[2][i]) ){
                return board[0][i];
        }
    }
    //check diagonals
    if( (board[0][0] && board[0][0] == board[1][1] && board[1][1] == board[2][2]) || 
        (board[2][0] && board[2][0] == board[1][1] && board[1][1] == board[0][2]) ){
        return board[1][1];
    }

    return null;  
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
    tap(state => {
        if(state.finished){
            gameState$.complete();
        }
    }),
    //if the move was coming from user, then schedule computer click
    tap((state) => {
        if(state.nextPlayer == 2 && !state.finished){
            simulateComputerTurn(getEmptyCells(state.board))
        }
    }),
    //emit samples while not finished
    takeWhile(({finished}) => finished == false, true),
    tap(console.log),
);