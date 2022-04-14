import {CATEGORIES_REQUEST, CATEGORIES_REQUEST_ERROR, CATEGORIES_REQUEST_SUCCESS} from "../actions/actionTypes";

const initialState = { items: [{id: null, title: 'Все'}], loading: false, error: null };

export default function categoriesReducer(state = initialState, action) {
    switch (action.type) {
        case CATEGORIES_REQUEST:
            return { ...state, items: [...initialState.items], loading: true, error: null, };
        case CATEGORIES_REQUEST_ERROR:
            const {error} = action.payload;
            return { ...state, items: [...initialState.items], loading: false, error, };
        case CATEGORIES_REQUEST_SUCCESS:
            const {items} = action.payload;
            return { ...state, items: [...initialState.items, ...items], loading: false, error: null, };
        default:
            return state;
    } }
