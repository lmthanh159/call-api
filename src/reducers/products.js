import * as types from '../constants/ActionTypes';

var initialState = [];

var findIndex = (products, id) => {
    let result = -1;
    if(products.length > 0){
        products.forEach((product, index) => {
            if(product.id === id){
                result = index;
            }
        })
    }
    return result;
}

const products = (state = initialState, action) => {
    switch(action.type){
        case types.FETCH_PRODUCTS:{
            state = action.products;
            return [...state];
        }
        case types.DELETE_PRODUCT:{
            let index = findIndex(state, action.id);
            if(index !== -1){
                state.splice(index, 1);
            }
            return [...state];
        }
        case types.ADD_PRODUCT:{
            state.push(action.product);
            return [...state];
        }
        case types.UPDATE_PRODUCT:{
            let index = findIndex(state, action.product.id);
            if(index !== -1){
                state[index] = action.product;
            }
            return [...state];
        }
        case types.CLEAR_ALL:{
            let index = findIndex(state, action.id);
            if(index !== -1){
                state.splice(index, 1);
            }
            return [];
        }
        default: return [...state];
    }
}

export default products;