/* eslint-disable no-restricted-globals */
import React, { Component, Fragment } from 'react';
import Products from '../../components/Products/Products';
import Product from '../../components/Product/Product';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import * as action from '../../actions/index';

const mapStateToProps = (state) =>{
    return{
        products: state.products
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return{
        fetchProductsRequest: () => {
            dispatch(action.fetchProductsRequest());
        },
        deleteProductRequest: (id) => {
            dispatch(action.deleteProductRequest(id));
        },
        clearAllRequest: (products) => {
            dispatch(action.clearAllRequest(products));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(class ProductsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        };    
    }

    componentDidMount(){
        this.props.fetchProductsRequest();
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.products){
            let {products} = nextProps;
            this.setState({
                products: products
            });
        } else{
            this.setState({
                products: []
            });
        }
    }

    onDelete = (id) => {
        this.props.deleteProductRequest(id);
    }

    onClear = () => {
        let {products} = this.props;
        if(products.length > 0){
            if(confirm('Are you sure want to clear all items?')){
                this.props.clearAllRequest(products);
                this.setState({
                    products: products
                });
            }
        } else{
            alert('There is no item to clear!');
        }
    }
    
    render() {
        var {products} = this.state;

        return (
            <Fragment>
                <Link className="btn btn-info margintb-10 marginrl-5" to="/products/add">Add Product</Link>
                <button className="btn btn-danger margintb-10 marginrl-5" onClick={this.onClear}>Clear All</button>
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h3 className="panel-title">Products List</h3>
                    </div>
                    <div className="panel-body">
                        <Products>
                            {this.showItem(products)}
                        </Products>
                    </div>
                </div>
            </Fragment>
        );
    }

    showItem = (products) => {
        var result = null;
        if(products.length > 0){
            result = products.map((product, index) => {
                return(
                    <Product key={index} product={product} index={index} onDelete={this.onDelete}/>
                );
            });
        }
        return result;
    }
})
