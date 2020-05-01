import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../../pages/Home';
import NotFound from '../Layout/NotFound/NotFound';
import Login from '../Auth/Login/Login';
import Register from '../Auth/Register/Register';
import PrivateRoute from './PrivateRoutes';
import CreatePost from '../Post/CreatePost/CreatePost';

const Routes = () => {
    return (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute exact path="/create_post" component={CreatePost} />
        <Route component={NotFound} />
    </Switch>
    )
}

export default Routes;