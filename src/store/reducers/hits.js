import {HITS_REQUEST, HITS_REQUEST_ERROR, HITS_REQUEST_SUCCESS} from "../actions/actionTypes";

const initialState = { items: [], loading: false, error: null };

export default function hitsReducer(state = initialState, action) {
    switch (action.type) {
        case HITS_REQUEST:
            return { ...state, items: [], loading: true, error: null, };
        case HITS_REQUEST_ERROR:
            const {error} = action.payload;
            return { ...state, items: [], loading: false, error, };
        case HITS_REQUEST_SUCCESS:
            const {items} = action.payload;
            return { ...state, items, loading: false, error: null, };
        default:
            return state;
    } }
