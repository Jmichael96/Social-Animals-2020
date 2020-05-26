import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Wrapper from '../../Layout/Wrapper/Wrapper';
import ProfileSettings from '../ProfileSettings/ProfileSettings';
import Spinner from '../../Layout/Spinner/Spinner';
import './currentUserProfile.css';
import ProfilePosts from '../../Post/FetchPosts/CurrentUserProfilePosts/CurrentUserProfilePosts';

const CurrentUserProfile = ({ auth: { user, loading } }) => {

    const renderFollowers = () => {

    }

    const renderFollowing = () => {

    }

    return loading ? <Spinner /> : (
        <Fragment>
            <h1>Hello {user.username}</h1>
            <img id="profilePic" src={user.profilePicture} />
            
            <p>{user.name}</p>
            <p>{user.bio}</p>
            <p>{user.location}</p>
            <p>{user.email}</p>
            <ProfileSettings />

            <ProfilePosts />
        </Fragment>
    )
}

CurrentUserProfile.propTypes = {
    auth: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(CurrentUserProfile);