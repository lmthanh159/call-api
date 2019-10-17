import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import * as action from '../../actions/index';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    return{
        productItem: state.productItem
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return{
        addProductRequest: (product, history) => {
            dispatch(action.addProductRequest(product, history));
        },
        getProductByIDRequest: (id) => {
            dispatch(action.getProductByIDRequest(id));
        },
        editProductRequest: (product, history) => {
            dispatch(action.editProductRequest(product, history));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(class ProductAction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            price: '',
            status: ''
        }    
    }

    componentDidMount(){
        let {match} = this.props;
        if(match){
            let id = match.params.id;
            this.props.getProductByIDRequest(id);
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.productItem){
            let {productItem} = nextProps;
            this.setState({
                id: productItem.id,
                name: productItem.name,
                price: productItem.price,
                status:productItem.status
            });
        }
    }

    onChange = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.type === 'checkbox'? target.checked : target.value;
        this.setState({
            [name]: value
        });
    }
    
    onSave = (e) => {
        e.preventDefault();
        let {name, price, status, id} = this.state;
        let obj = {
            id: id,
            name: name,
            price: price,
            status: status
        }
        let {history} = this.props;
        if(id){
            this.props.editProductRequest(obj, history);
        } else{
            this.props.addProductRequest(obj, history);
        }
    }
    
    render() {
        var {name, price, status, id} = this.state;

        return (
            <div className="container">
                <form onSubmit={this.onSave}>
                    <legend>{id !== ''? 'Edit product' : 'Add product'}</legend>
                    <div className="form-group">
                        <label>Product's name</label>
                        <input type="text" className="form-control" id="" 
                                placeholder="Product's name" name="name"
                                value={name} onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Product's price</label>
                        <input type="number" className="form-control" id="" 
                                placeholder="Product's price" name="price"
                                value={price} onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Status:</label>
                    </div>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" name="status"
                                value={status} onChange={this.onChange} checked={status}
                            />
                            Stocking
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary marginrl-5">{id !== ''? 'Save' : 'Add'}</button>
                    <Link className="btn btn-danger marginrl-5" to="/products">Cancle</Link>
                </form>
            </div>
        );
    }
})
