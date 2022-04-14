import hitsReducer from "./reducers/hits";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import hitsEpic from "./epics/hits";
import {combineEpics, createEpicMiddleware} from "redux-observable";
import categoriesReducer from "./reducers/categories";
import categoriesEpic from "./epics/categories";
import catalogEpic from "./epics/catalog";
import catalogReducer from "./reducers/catalog";
import cartReducer from "./reducers/cart";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const epic = combineEpics(
    hitsEpic,
    categoriesEpic,
    catalogEpic,
);
const epicMiddleware = createEpicMiddleware();

const reducer = combineReducers({
    hits: hitsReducer,
    categories: categoriesReducer,
    catalog: catalogReducer,
    cart: cartReducer,
});
const store = createStore(reducer, composeEnhancers(
    applyMiddleware(epicMiddleware)
));

epicMiddleware.run(epic);

export default store;
