import {ofType} from "redux-observable";
import {CATALOG_REQUEST} from "../actions/actionTypes";
import {catchError, map, of, switchMap} from "rxjs";
import {ajax} from "rxjs/ajax";
import {catalogFailure, catalogSuccess} from "../actions";

const catalogEpic = actions$ => actions$.pipe(
    ofType(CATALOG_REQUEST),
    switchMap((req) => {
        const {payload} = req;
        let query = '';

        if (payload.categoryId || payload.offset || payload.search) {
            query += '?';

            query += payload.categoryId ? `categoryId=${payload.categoryId}&` : '';
            query += payload.offset ? `offset=${payload.offset}&` : '';
            query += payload.search ? `q=${payload.search}&` : '';
        }

        return ajax.getJSON(`${process.env.REACT_APP_URL}items${query}`).pipe(
            map((items) => catalogSuccess(items)),
            catchError(err => of(catalogFailure(err))),
        )
    })
)

export default catalogEpic;
