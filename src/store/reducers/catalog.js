import {CATALOG_REQUEST, CATALOG_REQUEST_ERROR, CATALOG_REQUEST_SUCCESS} from "../actions/actionTypes";

const initialState = { items: [], loading: false, error: null, disableLoadMore: false };

export default function catalogReducer(state = initialState, action) {
    switch (action.type) {
        case CATALOG_REQUEST:
            return { ...state, loading: true, error: null, };
        case CATALOG_REQUEST_ERROR:
            const {error} = action.payload;

            return { ...state, loading: false, error, };
        case CATALOG_REQUEST_SUCCESS:
            const {items} = action.payload;

            return { ...state, items, loading: false, error: null, disableLoadMore: items.length !== 6 };
        default:
            return state;
    } }
