import { displayLog } from './utils';
import { from } from 'rxjs';

export default () => {
    /** start coding */
    const myArray = [1,2,3,4,5];  
    const myString = "Hello world!";  
    const myPromise = new Promise(resolve => setTimeout( () => {
        resolve('Hello World!'); 
    },2000));

    const observable = from(myPromise);
    const subscription = observable.subscribe(val => displayLog(val));
    /** end coding */
}