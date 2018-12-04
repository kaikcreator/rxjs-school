import { displayLog } from '../utils';
import { interval } from 'rxjs';
import { tap } from 'rxjs/operators';

export default () =>{
    /** example code here */

    const observable = interval(1000).pipe(
        tap(x => displayLog("evt ", x))
    );

    /** end of example code  */
};


//output: [None]
