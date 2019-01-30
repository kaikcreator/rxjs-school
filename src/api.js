import { timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';

export class api{
    static getComment(id){
        return timer(Math.random()*1000).pipe(
            mapTo({id:id, comment:`comment number ${id}`})
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