import * as types from '../constants/ActionTypes';
import callAPI from '../utils/apiCaller';

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

 /* */
export const fetchProductsRequest = () => {
    return (dispatch) => {
        return callAPI('products', 'GET', null).then((res) => {
            dispatch(fetchProducts(res.data));
        });
    }
};

export const fetchProducts = (products) => {
    return{
        type: types.FETCH_PRODUCTS,
        products
    };
};

/* */
export const addProductRequest = (product, history) => {
    return (dispatch) => {
        return callAPI('products', 'POST', product).then((res) => {
            dispatch(addProduct(res.data));
            history.goBack();
        });
    }
}

export const addProduct = (product) => {
    return{
        type: types.ADD_PRODUCT,
        product
    };
}

/* */
export const deleteProductRequest = (id) => {
    return (dispatch) => {
        return callAPI(`products/${id}`, 'DELETE', null).then((res) => {
            if(res.status === 200){
                dispatch(deleteProduct(id));
            }
        });
    }
};

export const deleteProduct = (id) => {
    return{
        type: types.DELETE_PRODUCT,
        id
    };
};

/* */
export const editProductRequest = (product, history) => {
    return (dispatch) => {
        return callAPI(`products/${product.id}`, 'PUT', product).then((res) => {
            dispatch(editProduct(res.data));
            history.goBack();
        });
    }
}

export const editProduct = (product) => {
    return{
        type: types.UPDATE_PRODUCT,
        product
    };
}

/* */
export const getProductByIDRequest = (id) => {
    return (dispatch) => {
        return callAPI(`products/${id}`, 'GET', null).then((res) => {
            dispatch(getProductByID(res.data));
        });
    }
}

export const getProductByID = (product) => {
    return{
        type: types.GET_PRODUCT,
        product
    };
}

/* */
export const clearAllRequest = (products) => {
    return (dispatch) => {
        if(products.length > 0){
            let index = -1;
            products.forEach((product) => {
                return callAPI(`products/${product.id}`, 'DELETE', null).then((res) => {
                    if(res.status === 200){
                        dispatch(clearAll(res.data.id));
                    }
                    index = findIndex(products, product.id);
                    if(index !== -1){
                        products.splice(index, 1);
                    }
                });
            });
        }
    }
}

export const clearAll = (id) => {
    return{
        type: types.CLEAR_ALL,
        id
    }
}