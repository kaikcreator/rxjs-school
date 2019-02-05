import { Subject, timer } from 'rxjs';

//this observable return only computer valid clicks
export const computerMove$ = new Subject();  

//side efect that launches a valid computer click
export const simulateComputerTurn = (validCells) =>{
    //pick random cell between the empty ones
    const randomCell = Math.floor(Math.random() * validCells.length);
    //delay emission of computer click with coordinates of valid random cell selected
    timer(500).subscribe(()=>computerMove$.next(validCells[randomCell]));
}