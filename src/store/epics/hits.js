import {ofType} from "redux-observable";
import {HITS_REQUEST} from "../actions/actionTypes";
import {catchError, map, of, switchMap} from "rxjs";
import {ajax} from "rxjs/ajax";
import {hitsFailure, hitsSuccess} from "../actions";

const hitsEpic = actions$ => actions$.pipe(
    ofType(HITS_REQUEST),
    switchMap(() => ajax.getJSON(`${process.env.REACT_APP_URL}top-sales`).pipe(
        map((items) => hitsSuccess(items)),
        catchError(err => of(hitsFailure(err))),
    ))
)

export default hitsEpic;
