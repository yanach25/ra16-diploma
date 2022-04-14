import {CART_ADD, CART_CLEAR, CART_DELETE} from "../actions/actionTypes";

const carts = localStorage.getItem('cart');
const initialState = carts ? JSON.parse(carts) : [];

export default function cartReducer(state = initialState, action) {
    switch (action.type) {
        case CART_ADD:
            const {product, size, qty} = action.payload;
            const products = [...state];
            const index = products.findIndex((item) => item.product.id === product.id && item.size === size);
            let modifiedState;
            if (index>=0) {
                products[index].qty += qty;
                modifiedState = products;
            } else {
                modifiedState = [...state, {product, size, qty}];
            }

            localStorage.setItem('cart', JSON.stringify(modifiedState));

            return modifiedState;
        case CART_DELETE:
            const {id} = action.payload;
            const stateAfterDeleting = [...state.filter(item => item.product.id !== id)];
            localStorage.setItem('cart', JSON.stringify(stateAfterDeleting));

            return stateAfterDeleting;
        case CART_CLEAR:
            localStorage.removeItem('cart')
            return [];
        default:
            return state;
    } }
