/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Fragment } from 'react';
import './App.css';
import Menu from './components/Menu/Menu';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import routes from './Routes';

export default class App extends Component {
    render() {
        return (
            <Router>
                <Fragment>
                    <Menu/>
                    <div className="container">
                        <Switch>
                            {this.showContent(routes)}
                        </Switch>
                    </div>
                </Fragment>
            </Router>
        );
    }

    showContent = (routes) => {
        var result = null;
        if(routes.length > 0){
            result = routes.map((route, index) => {
                return(
                    <Route key={index} path={route.path} exact={route.exact} component={route.main}/>
                );
            });
        }
        return result;
    }
}