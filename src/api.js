import { timer, throwError, of } from 'rxjs';
import { mapTo, mergeMap } from 'rxjs/operators';

export class api{
    static getComment(id){
        return timer(Math.random()*1000).pipe(
            mergeMap(evt =>{
                const isError = Math.random() > 0.1 ? true : false;
                if(isError){
                    return throwError(new Error('Request Timeout'));
                }
                else{
                    return of({id:id, comment:`comment number ${id}`})
                }
            })
        );
    }

    static getCommentsList(page){
        const buildCommentsList = (page) =>{
            let comments = [];
            const offset = (page-1)*10;
            for(let i=offset; i < offset+10; i++){
                comments.push({id:i, comment:`comment number ${i}`})
            }
            return comments;
        }
        return timer(Math.random()*1000).pipe(
            mapTo(buildCommentsList(page))
        );
    }    
}