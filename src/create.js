import { displayLog } from './utils';
import { Observable } from 'rxjs';

export default () => {
    /** start coding */
    const hello = Observable.create(function(observer) {
        observer.next('Hello');
        setTimeout(()=>{
            observer.next('World');
            observer.complete();
        }, 2000);
    });
    
    const observer = {
        next: evt => displayLog(evt),
        error: err => console.error("[ERR] - ", err),
        complete: () => displayLog("[DONE]")
    }

    const subscribe = hello.subscribe(observer);
    const subscribe2 = hello.subscribe(observer);
    subscribe.unsubscribe();
    /** end coding */
}