import { displayLog } from './utils';
import { interval, timer } from 'rxjs';


export default () => {
    /** start coding */
    
    const source = interval(500);
    
    const subscription = source.subscribe(data => displayLog(data));

    timer(3000).subscribe(()=> subscription.unsubscribe());
    //setTimeout(() => subscription.unsubscribe(), 3000 );

    const source2 = timer(4000, 100);
    const subscription2 = source2.subscribe(data => displayLog(`2 - ${data}`));
    timer(6000).subscribe(() => subscription2.unsubscribe());



    /** end coding */
}