/* eslint-disable no-restricted-globals */
import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Product extends Component {
    onDelete = (id) => {
        if(confirm('Are you sure want to delete this item?')){
            this.props.onDelete(id);
        }
    }
    
    render() {
        var {product, index} = this.props;
        var statusName = product.status? 'Stocking' : 'Out of stock';
        var statusClass = product.status? 'label-warning' : 'label-default';

        return (
            <tr>
                <td className="text-center">{index + 1}</td>
                <td className="text-center">{product.id}</td>
                <td>{product.name}</td>
                <td className="text-center">{product.price}$</td>
                <td className="text-center">
                    <span className={`label ${statusClass}`}>{statusName}</span>
                </td>
                <td className="text-center">
                    <Link className="btn btn-success marginrl-5" to={`/products/${product.id}/edit`}>Edit</Link>
                    <button className="btn btn-danger marginrl-5" 
                        onClick={() => this.onDelete(product.id)}>Delete</button>
                </td>
            </tr>
        )
    }
}
