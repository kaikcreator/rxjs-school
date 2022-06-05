/** @format */
import { from, fromEvent } from 'rxjs';
import { concatMap, map, mergeMap, scan, tap } from 'rxjs/operators';

import { api } from './api';
import { displayLog } from './utils';


export default () => {
	/** start coding */

	const button = document.getElementById('btn');

	/** get comments on button click */
	fromEvent(button, 'click')
		.pipe(
			scan((acc, evt) => acc + 1, 0),
			concatMap((page) => api.getCommentsList(page)),
			mergeMap((comments) => from(comments)),
			map(JSON.stringify),
			tap(console.log)
		)
		.subscribe(displayLog);

	/** end coding */
};
