import { displayLog } from './utils';
import { interval } from 'rxjs';


const example = () =>{
    const observable = interval(1000); //emits 1 event every second
    const subscription = observable.subscribe(x => displayLog(x) /*esto es un observer*/);

    setTimeout(()=> { subscription.unsubscribe() }, 4000); //cancel suscription in 4
}

export default example();

// output (one value every second): 0, 1, 2, 3
