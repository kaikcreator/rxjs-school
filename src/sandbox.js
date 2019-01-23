import { updateDisplay, displayLog } from './utils';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

export default () => {
    /** start coding */

    /** init canvas and context reference  */
    const canvas = document.getElementById('drawboard');
    const ctx = canvas.getContext('2d');

    /** method to draw a line in canvas  */
    const drawLine = (initCoords, endCoords) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.moveTo(initCoords.x, initCoords.y);
        ctx.lineTo(endCoords.x, endCoords.y);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
    }

    /** helper method to retrieve local coords from click */
    const getLocalClickCoords = (event, parent) =>{
        return {
            x: event.clientX - parent.offsetLeft,
            y: event.clientY - parent.offsetTop,
        }
    }

    /** observable from canvas mouse down events */
    const mouseStart$ = fromEvent(canvas, 'mousedown').pipe(
        map(event => {
            return {
                label: 'start',
                coords: getLocalClickCoords(event, canvas)
            }
        }));

    /** observable from canvas mouse up events */
    const mouseEnd$ = fromEvent(canvas, 'mouseup').pipe(
        map(event => {
            return {
                label: 'end',
                coords: getLocalClickCoords(event, canvas)
            }
        }));

    /** observable from canvas mouse move events */
    const mouseMove$ = fromEvent(canvas, 'mousemove').pipe(
        map(event => {
            return {
                label: 'drawing',
                coords: getLocalClickCoords(event, canvas)
            }
        }));        


    //TODO: draw current line

    

    /** end coding */
}