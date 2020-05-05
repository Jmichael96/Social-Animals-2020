import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Alert from '../Layout/Alert/Alert';
import Modal from '../Layout/Modal/Modal';
import Home from '../../pages/Home';
import NotFound from '../Layout/NotFound/NotFound';
import Login from '../Auth/Login/Login';
import Register from '../Auth/Register/Register';
import PrivateRoute from './PrivateRoutes';
import CreatePost from '../Post/CreatePost/CreatePost';
import UpdateProfile from '../Profile/UpdateProfile/UpdateProfile';
import ProfileLandingPage from '../Profile/PofileLandingPage/ProfileLandingPage';
import UserProfile from '../Profile/UserProfile/UserProfile';
import SearchUsernames from '../Search/SearchUsernames/SearchUsernames';

const Routes = () => {
    return (
        <section>
            <Alert />
            <Modal />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <PrivateRoute exact path="/create_post" component={CreatePost} />
                <PrivateRoute exact path="/create_profile" component={UpdateProfile} />
                <PrivateRoute exact path="/profile" component={ProfileLandingPage} />
                <PrivateRoute exact path="/user_profile/:id" component={UserProfile} />
                <PrivateRoute exact path="/usernames" component={SearchUsernames} />
                <Route component={NotFound} />
            </Switch>
        </section>
    )
}

export default Routes;