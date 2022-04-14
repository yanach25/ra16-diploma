import {
    CART_ADD, CART_CLEAR, CART_DELETE,
    CATALOG_REQUEST, CATALOG_REQUEST_ERROR, CATALOG_REQUEST_SUCCESS,
    CATEGORIES_REQUEST,
    CATEGORIES_REQUEST_ERROR,
    CATEGORIES_REQUEST_SUCCESS,
    HITS_REQUEST,
    HITS_REQUEST_ERROR,
    HITS_REQUEST_SUCCESS
} from "./actionTypes";

// hits
export const hitsRequest = () => ({
    type: HITS_REQUEST,
});
export const hitsFailure = error => ({
    type: HITS_REQUEST_ERROR, payload: {error},
});
export const hitsSuccess = items => ({
    type: HITS_REQUEST_SUCCESS, payload: {items},
});

//categories
export const categoriesRequest = () => ({
    type: CATEGORIES_REQUEST,
});
export const categoriesFailure = error => ({
    type: CATEGORIES_REQUEST_ERROR, payload: {error},
});
export const categoriesSuccess = items => ({
    type: CATEGORIES_REQUEST_SUCCESS, payload: {items},
});

//categories
export const catalogRequest = (categoryId, offset, search) => ({
    type: CATALOG_REQUEST, payload: {categoryId, offset, search},
});
export const catalogFailure = error => ({
    type: CATALOG_REQUEST_ERROR, payload: {error},
});
export const catalogSuccess = (items) => ({
    type: CATALOG_REQUEST_SUCCESS, payload: {items},
});

// cart
export const cartAddRequest = (product, size, qty) => ({
    type: CART_ADD, payload: {product, size, qty},
});
export const cartDeleteRequest = (id) => ({
    type: CART_DELETE, payload: {id},
});
export const cartClearRequest = () => ({
    type: CART_CLEAR,
});
