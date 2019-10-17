/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';

const menu = [
    {
        name: 'Home',
        to: '/',
        exact: true
    },
    {
        name: 'Products',
        to: '/products',
        exact: false
    }   
];

const MenuLink = ({label, to, activeWhenExact}) => {
    return(
        <Route path={to} exact={activeWhenExact} children={
            ({match}) => {
                let active = match? 'active' : '';
                return(
                    <li className={active}>
                        <Link to={to}>{label}</Link>
                    </li>
                );
            }
        }/>
    );
};

export default class Menu extends Component {
    render() {
        return (
            <div className="navbar navbar-default">
                <a className="navbar-brand" href="#">Call API</a>
                <ul className="nav navbar-nav">
                    {this.showMenu(menu)}
                </ul>
            </div>
        );
    }

    showMenu = (menu) => {
        var result = null;
        if(menu.length > 0){
            result = menu.map((item, index) => {
                return(
                    <MenuLink key={index} label={item.name} to={item.to} activeWhenExact={item.exact}/>
                );
            });
        }
        return result;
    }
}
