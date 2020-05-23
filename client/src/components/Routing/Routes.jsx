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
import ProfileLandingPage from '../Profile/CurrentUserProfile/CurrentUserProfile';
import UserProfile from '../Profile/UserProfile/UserProfile';
import SearchUsernames from '../Search/SearchUsernames/SearchUsernames';
import IteratingModal from '../Layout/IteratingModal/IteratingModal';
import Image from '../Image/Image';
import CreateProfile from '../Profile/CreateProfile/CreateProfile';
import CurrentUserProfile from '../Profile/CurrentUserProfile/CurrentUserProfile';

const Routes = () => {
    return (
        <section>
            <Alert />
            <Modal />
            <IteratingModal />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/image" component={Image} />
                <PrivateRoute exact path="/my_profile" component={CurrentUserProfile} />
                <PrivateRoute exact path="/create_post" component={CreatePost} />
                <PrivateRoute exact path="/create_profile" component={CreateProfile} />
                <PrivateRoute exact path="/update_profile" component={UpdateProfile} />
                {/* <PrivateRoute exact path="/profile" component={ProfileLandingPage} /> */}
                <PrivateRoute exact path="/user_profile/:id" component={UserProfile} />
                <PrivateRoute exact path="/usernames" component={SearchUsernames} />
                <Route component={NotFound} />
            </Switch>
        </section>
    )
}

export default Routes;