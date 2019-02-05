import { updateDisplay } from './utils';
import { fromEvent, interval } from 'rxjs';
import { mapTo, scan, takeWhile  } from 'rxjs/operators';

export default () => {
    /** start coding */

    /** number of seconds to init countdown */
    const countdownSeconds = 10;
    
    /** access interface buttons */
    const pauseButton = document.getElementById('pause-btn');
    const resumeButton = document.getElementById('resume-btn');

    /** get comments on button click */
    const pause$ = fromEvent(pauseButton, 'click');
    const resume$ = fromEvent(resumeButton, 'click');

    /** 1s negative interval */
    const interval$ = interval(1000).pipe(mapTo(-1));

    /** countdown timer */
    const countdown$ = interval$.pipe(
        scan((acc, curr) => ( curr ? curr + acc : curr ), countdownSeconds),
        takeWhile(v => v >= 0)
    );

    /** subscribe to countdown */
    countdown$.subscribe(updateDisplay);

    
    /** end coding */
}