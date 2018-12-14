import { displayLog } from '../utils';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

export default () =>{
    /** example code here */

    function my5sInterval(ms){
        return Observable.create((observer) =>{
            let count = 0;
            const id = setInterval(()=>{
                observer.next(count);
                count++;
                if(count >=5 ){ 
                    clearInterval(id); 
                    observer.complete();
                }
            }, ms);
        });
    }

    const observable = my5sInterval(1000);

    const observer = {
        next: x => console.log(x),
        error: err => console.error(err),
        complete: () => console.log('done')
    };

    observable.subscribe(observer);
    //output: 0, 1, 2, 3, done

    /** end of example code  */
};