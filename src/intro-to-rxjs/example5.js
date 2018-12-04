import { displayLog } from '../utils';
import { interval } from 'rxjs';
import { tap } from 'rxjs/operators';

export default () =>{
    /** example code here */

    const observable = interval(1000).pipe(
        tap(x => displayLog("evt ", x))
    );
    //output: [None]

    /** end of example code  */
};

