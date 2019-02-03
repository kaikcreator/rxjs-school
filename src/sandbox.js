import { displayLog } from './utils';
import { game$ } from './tic-tac-toe/game';
import { drawBoard, drawGame } from './tic-tac-toe/draw'; 


export default () => {
    /** start coding */


    drawBoard();
    
    const subscription = game$.subscribe(data => drawGame(data), 
    err => console.log("error: ", err), ()=> console.log("COMPLETE"));
    /** end coding */
}