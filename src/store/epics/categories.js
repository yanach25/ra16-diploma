import {ofType} from "redux-observable";
import {CATEGORIES_REQUEST} from "../actions/actionTypes";
import {catchError, map, of, switchMap} from "rxjs";
import {ajax} from "rxjs/ajax";
import {categoriesFailure, categoriesSuccess} from "../actions";

const categoriesEpic = actions$ => actions$.pipe(
    ofType(CATEGORIES_REQUEST),
    switchMap(() => ajax.getJSON(`${process.env.REACT_APP_URL}categories`).pipe(
        map((items) => categoriesSuccess(items)),
        catchError(err => of(categoriesFailure(err))),
    ))
)

export default categoriesEpic;
