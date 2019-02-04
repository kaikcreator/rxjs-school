import { displayLog } from './utils';
import { game$ } from './tic-tac-toe/game';
import { drawBoard, drawGame } from './tic-tac-toe/draw'; 


export default () => {
    /** start coding */


    drawBoard();
    
    const subscription = game$.subscribe(gameState => {
        drawGame(gameState);
        if(gameState.winner){
            console.log(gameState.winner == 1 ? 'you win' : 'you lose');
        }
        else if(gameState.finished){
            console.log("draws");
        }
    }, 
    err => console.log("error: ", err), data => console.log("COMPLETE"));
    /** end coding */
}