import { displayLog } from './utils';
import { game$ } from './tic-tac-toe/game';
import { drawGame, writeMessage } from './tic-tac-toe/draw'; 


export default () => {
    /** start coding */
    
    const subscription = game$.subscribe(gameState => {
        drawGame(gameState);
        if(gameState.winner){
            writeMessage(gameState.winner == 1 ? 'you win' : 'you lose');
        }
        else if(gameState.finished){
            writeMessage("draws");
        }
    }, 
    err => console.log("error: ", err), data => console.log("COMPLETE"));
    /** end coding */
}