import {combineReducers} from 'redux';
import products from './products';
import productItem from './productItem';

const appReducer = combineReducers({
    products,
    productItem
});

export default appReducer;