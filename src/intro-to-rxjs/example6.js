import { displayLog } from '../utils';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

export default () =>{
    /** example code here */

    const observable = interval(1000).pipe(take(4));

    const observer = {
        next: x => console.log(x),
        error: err => console.error(err),
        complete: () => console.log('done')
    };

    observable.subscribe(observer);
    //output: 0, 1, 2, 3, done

    /** end of example code  */
};
