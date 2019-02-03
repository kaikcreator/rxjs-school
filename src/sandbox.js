import { displayLog } from './utils';
import { fromEvent, combineLatest, BehaviorSubject, timer } from 'rxjs';
import { map, withLatestFrom, filter, tap, scan } from 'rxjs/operators';

export default () => {
    /** start coding */
    const grid = document.getElementById('grid');
    const gridSize = 3;
    const cellWidth = 50;

    
    //proxy subject needed to break cicrcular dependency.
    const gameState$ = new BehaviorSubject({
        board: Array(gridSize).fill().map(() => Array(gridSize).fill(0)),
        nextPlayer: 1 //1 is user, 2 is computer
    });

    //user input
    const click$ = fromEvent(grid, 'click').pipe(
        map(val =>  { return {
            x: Math.floor(val.offsetX/cellWidth), 
            y: Math.floor(val.offsetY/cellWidth)
        }})
    );

    //this observable return only computer valid clicks
    const computerClick$ = new BehaviorSubject({x:0, y:0});    

    //this observable return only user valid clicks
    const userClick$ = click$.pipe(
        withLatestFrom(gameState$),
        //allow only clicks when it is the user turn
        filter(([click, state]) => state.nextPlayer == 1),
        //check that it is a valid move
        filter(([click, state]) => state.board[click.y][click.x] == 0),
        //return only the click value
        map(([click, state]) => click),        
    )

    //pure function to find out empty cells
    const getEmptyCells = (board) =>{
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

    //side efect that launches a valid computer click
    const simulateComputerClick = (board) =>{
        const emptyCells = getEmptyCells(board);
        //pick random cell between the empty ones
        const randomCell = Math.floor(Math.random() * emptyCells.length);
        //delay emission of computer click with coordinates of valid random cell selected
        timer(1000).subscribe(()=>computerClick$.next(emptyCells[randomCell]));
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
    const game$ = combineLatest(userClick$, computerClick$).pipe(
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
        tap(console.log),
        //if the move was coming from user, then schedule computer click
        tap((state) => {
            if(state.nextPlayer == 2){
                simulateComputerClick(state.board)
            }
        })
    );


    const subscription = game$.subscribe(data => displayLog(data));

    /** end coding */

    // OTHER REACTIVE APPROACH USING REDUCERS
    // const userTurnReducer = click$.pipe(
    //     map(userClick => (state) => {
    //         //return old state if it's not the users turn
    //         if(state.nextPlayer != 1){ return state;} 

    //         //return old state if it's not a valid move
    //         if(state.board[userClick.x][userClick.y] != 0){ return state;}
    //     })
    // )
    //
    // const game$ = merge(userTurnReducer, reducer2, ...).pipe(
    //     startWith(gameState),
    //     switchMap(({nextPlayer}) => nextPlayer == 1 ? click$ : computer$),
    //     scan((acc/* acc is the state */,reducer) => reducer(acc))
    // )        
}