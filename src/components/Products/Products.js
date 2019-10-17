import React, { Component } from 'react';

export default class Products extends Component {
    render() {
        return (
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th className="text-center">Index</th>
                        <th className="text-center">ID</th>
                        <th className="text-center">Name</th>
                        <th className="text-center">Price</th>
                        <th className="text-center">Status</th>
                        <th className="text-center">Options</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.children}
                </tbody>
            </table>
        )
    }
}
