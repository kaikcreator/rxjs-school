import { timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';

export class api{
    static getComment(id){
        return timer(Math.random()*1000).pipe(
            mapTo({id:id, comment:`comment number ${id}`})
        );
    }
}