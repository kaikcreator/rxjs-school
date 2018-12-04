import { displayLog } from '../utils';
import { interval, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

export default () =>{
    /** example code here */

    const observable = interval(1000).pipe(map(x=> Math.random().toPrecision(3) ));
    
    const subject = new Subject();
    const s0 = observable.subscribe(subject);

    const subscription1 = subject.subscribe(x => displayLog("[obs1]: " + x));
    const subscription2 = subject.subscribe(x => displayLog("[obs2]: " + x));
    setTimeout(()=> { subscription1.unsubscribe() }, 4000);
    setTimeout(()=> { subscription2.unsubscribe() }, 4000);
    setTimeout(()=> { s0.unsubscribe() }, 4000);

    /** end of example code  */
};

