import React from 'react';
import ProductsPage from './pages/Products/Products';
import Home from './pages/Home/Home';
import ProductAction from './pages/ProductAction/ProductAction';
import NotFound from './pages/NotFound/404';

const routes = [
    {
        path: '/',
        exact: true,
        main: () => <Home/>
    },
    {
        path: '/products',
        exact: true,
        main: () => <ProductsPage/>
    },
    {
        path: '/products/add',
        exact: false,
        main: ({history}) => <ProductAction history={history}/>
    },
    {
        path: '/products/:id/edit',
        exact: false,
        main: ({match, history}) => <ProductAction match={match} history={history}/>
    },
    {
        path: '',
        exact: false,
        main: () => <NotFound/>
    }
];

export default routes;