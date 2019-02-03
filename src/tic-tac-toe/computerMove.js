import { BehaviorSubject, timer } from 'rxjs';


//this observable return only computer valid clicks
export const computerMove$ = new BehaviorSubject({x:0, y:0});    


//side efect that launches a valid computer click
export const simulateComputerTurn = (validCells) =>{
    //pick random cell between the empty ones
    const randomCell = Math.floor(Math.random() * validCells.length);
    //delay emission of computer click with coordinates of valid random cell selected
    timer(500).subscribe(()=>computerMove$.next(validCells[randomCell]));
}

export const closeComputerStream = ()=>{
    computerMove$.complete();
}