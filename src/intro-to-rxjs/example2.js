import { displayLog } from '../utils';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';

export default () =>{
    /** example code here */

    const observable = interval(1000);
    const observable2 = observable.pipe(map(x=> Math.random().toPrecision(3) ));
    const subscription = observable2.subscribe(x => displayLog(x));
    setTimeout(()=> { subscription.unsubscribe() }, 4000);
    //output: rand1, rand2, rand3, rand4

    /** end of example code  */
};

