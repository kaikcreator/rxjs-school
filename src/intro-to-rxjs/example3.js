import { displayLog } from '../utils';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';

export default () =>{
    /** example code here */

    const observable = interval(1000).pipe(map(x=> Math.random().toPrecision(3) ));
    const subscription1 = observable.subscribe(x => displayLog("[obs1]: " + x));
    const subscription2 = observable.subscribe(x => displayLog("[obs2]: " + x));
    setTimeout(()=> { subscription1.unsubscribe() }, 4000);
    setTimeout(()=> { subscription2.unsubscribe() }, 4000);

    /** end of example code  */
};

